<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::where('status', 1)->get();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required|unique:categories,name',
            'slug' => 'string|required',
            'parent_id' => 'integer|nullable',
            'sort_order' => 'integer|nullable',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'description'=>'string|nullable',
            'created_by' => 'integer|nullable',
            'updated_by' => 'integer|nullable',
            'status' => 'integer|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        } else {
            $imageName = null;
            if ($request->hasFile('thumbnail')) {
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->storeAs('images', $imageName, 'public');
            }
            $category = Category::create([
                'name' => $request->name,
                'slug' => $request->slug,
                'parent_id' => $request->parent_id,
                'sort_order' => $request->sort_order ?? 0,
                'thumbnail' => $imageName,
                'status' => $request->status,
            ]);

            $category->load('parentCategory');

            return response()->json([
                'message' => 'Category created successfully',
                'data' => $category,
            ], 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);
        if(!$category)
        {
            return response()->json(['message'=>'Category no have'], 404);
        }
        else{
            return response()->json([
                'id' => $category->id,
                'name'=>$category->name,
                'slug'=>$category->slug,
                'thumbnail'=>$category->thumbnail,
                'description'=>$category->description,
                'created_by'=>$category->created_by,
                'updated_by'=>$category->updated_by,
                'status'=>$category->status,
            ], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $brand = Category::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|unique:categories,name,' . $id,
            'slug' => 'string|nullable',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'parent_id' => 'integer|nullable',
            'description' => 'string|nullable',
            'created_by' => 'integer|nullable',
            'updated_by' => 'integer|nullable',
            'status' => 'integer|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

        $dataToUpdate = $request->only([
            'name', 'slug', 'description', 'created_by', 'updated_by', 'status', 'parent_id'
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($brand->thumbnail) {
                Storage::delete('public/images/' . $brand->thumbnail);
            }

            $fileName = $request->file('thumbnail')->getClientOriginalName();
            $request->file('thumbnail')->storeAs('images', $fileName, 'public');
            $dataToUpdate['thumbnail'] = $fileName;
        }

        $brand->update($dataToUpdate);
        return response()->json([
            'message' => 'Brand updated successfully',
            'data' => $brand->fresh()
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $hasProducts = Product::where('category_id', $id)->exists();
        if ($hasProducts) {
            return response()->json(['message' => 'Cannot delete category because it is associated with products'], 400);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }

    public function getImageCategory($id)
    {
        $category = Category::find($id);
        $image = $category->thumbnail;
        if (!$image || !Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Product image not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
    }

    public function putTrash($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'category not found'], 404);
        }

        $category->status = 2;
        $category->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Category::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $category = Category::find($id);
        if($category == null)
        {
            $result =[
                'status'=>false,
                'message'=>'category not found',
                'category'=>$category
            ];
        } elseif($category->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'category'=>null
            ];
        }
        else
        {
            $category->status = 1;
            $category->updated_by =  1;
            $category->updated_at =  date('Y-m-d H:i:s');
            $category->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'category'=>$category
            ];
        }
        return response()->json($result);
    }

}
