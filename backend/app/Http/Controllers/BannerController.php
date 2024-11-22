<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Banner::where('status', 1)->get();
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
                'name' => 'string|required|unique:banners,name',
                'link' => 'string|nullable',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'sort_order' => 'integer|nullable',
                'position' => 'string|nullable',
                'description' => 'string|nullable',
                'created_by' => 'integer|nullable',
                'updated_by' => 'integer|nullable',
                'status' => 'integer|nullable',
            ]);

            if ($validator->fails()) {
                return response()->json(["error" => $validator->errors()], 422);
            }else{
                $imageName = null;
                if ($request->hasFile('image')) {
                    $imageName = $request->file('image')->getClientOriginalName();
                    $request->file('image')->storeAs('images', $imageName, 'public');
                }

                $banner = Banner::create([
                    'name' => $request->name,
                    'link' => $request->link,
                    'image' => $imageName,
                    'sort_order' => $request->sort_order,
                    'position' => $request->position,
                    'description' => $request->description,
                    'created_by' => $request->created_by ,
                    'updated_by' => $request->updated_by,
                    'status' => $request->status,
                ]);

                return response()->json([
                    'message' => 'Banner created successfully',
                    'data' => $banner
                ], 201);
            }
        }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $banner = Banner::find($id);
        if(!$banner){
            return response()->json(['message' => 'Banner not found'], 404);
        }else{
            return $banner;
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
        $banner = Banner::find($id);
        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|unique:banners,name,' . $id,
            'link' => 'string|nullable',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'sort_order' => 'integer|nullable',
            'position' => 'in:1,2|nullable',
            'description' => 'string|nullable',
            'created_by' => 'integer|nullable',
            'updated_by' => 'integer|nullable',
            'status' => 'integer|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

        $dataToUpdate = $request->only([
            'name', 'link', 'sort_order', 'position', 'description', 'created_by', 'updated_by', 'status'
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::delete('public/' . $banner->image);
            }
            $fileName = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('images', $fileName, 'public');
            $dataToUpdate['image'] = $fileName;
        }

        $banner->update($dataToUpdate);
        return response()->json([
            'message' => 'Banner updated successfully',
            'data' => Banner::find($id)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if(!$banner){
            return response()->json(['error'=>'Banner not found'], 404);
        }else{
            try{
                $banner->delete();
                return response()->json(['message'=>'delete success'], 201);
            }catch(\Exception $e){
                return response()->json(['error'=>'delete failed'], 500);
            }
        }
    }

    public function getImageBanner($id)
    {
        $banner = Banner::find($id);
        $image = $banner->image;
        if (!$image || !Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Product image not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
    }

    public function putTrash($id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $banner->status = 2;
        $banner->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Banner::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $banner = Banner::find($id);
        if($banner == null)
        {
            $result =[
                'status'=>false,
                'message'=>'Brand not found',
                'banner'=>$banner
            ];
        } elseif($banner->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'banner'=>null
            ];
        }
        else
        {
            $banner->status = 1;
            $banner->updated_by =  1;
            $banner->updated_at =  date('Y-m-d H:i:s');
            $banner->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'banner'=>$banner
            ];
        }
        return response()->json($result);
    }

}




