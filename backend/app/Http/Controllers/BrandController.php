<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;


class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Brand::where('status',1)->get();
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
        $validator = Validator::make($request->all(),[
            'name' => 'string|required|unique:brands,name',
            'slug'=>'string|required',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sort_order'=>'integer|nullable',
            'description'=>'string|nullable',
            'created_by'=>'integer|required',
            'updated_by'=>'integer|required',
            'status'=>'integer|required',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()],422);
        }else{
            $imageName = null;
            if ($request->hasFile('thumbnail')) {
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->storeAs('images', $imageName, 'public');
            }
            $brand = Brand::create([
                'name' => $request->name,
                'slug' => $request->slug,
                'thumbnail' => $imageName,
                'sort_order' => $request->sort_order,
                'description' => $request->desciption,
                'created_by' => $request->created_by,
                'updated_by' => $request->updated_by,
                'status' => $request->status
            ]);

            return response()->json([
                'message' => 'Brand created successfully',
                'data' => $brand,
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(["message"=>"Brand not found"], 401);
        }else{
            return $brand;
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
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|unique:brands,name,' . $id,
            'slug' => 'string|nullable',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'sort_order' => 'integer|nullable',
            'description' => 'string|nullable',
            'created_by' => 'integer|nullable',
            'updated_by' => 'integer|nullable',
            'status' => 'integer|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

        $dataToUpdate = $request->only([
            'name', 'slug', 'sort_order', 'description', 'created_by', 'updated_by', 'status'
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
    public function destroy(string $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }
        $hasProducts = Product::where('brand_id', $id)->exists();
        if ($hasProducts) {
            return response()->json(['message' => 'Cannot delete brand because it is associated with products'], 400);
        }
        $brand->delete();
        return response()->json(['message' => 'Brand deleted successfully'], 200);
    }

    public function getImageBrand($id)
    {
        $brand = Brand::find($id);
        $image = $brand->thumbnail;
        if (!$image || !Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Brand image not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
    }

    public function putTrash($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $brand->status = 2;
        $brand->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Brand::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $brand = Brand::find($id);
        if($brand == null)
        {
            $result =[
                'status'=>false,
                'message'=>'Brand not found',
                'brand'=>$brand
            ];
        } elseif($brand->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'brand'=>null
            ];
        }
        else
        {
            $brand->status = 1;
            $brand->updated_by =  1;
            $brand->updated_at =  date('Y-m-d H:i:s');
            $brand->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'brand'=>$brand
            ];
        }
        return response()->json($result);
    }

}
