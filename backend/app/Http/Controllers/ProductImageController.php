<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productimage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productImage = Productimage::all();
        return $productImage;
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
            'product_id' => 'required|integer|exists:products,id',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        try {
            $imageName = null;
            if ($request->hasFile('thumbnail')) {
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->storeAs('images', $imageName, 'public');
            }
            $productimage = Productimage::create([
                'product_id' => $request->product_id,
                'thumbnail' => $imageName,
            ]);
            return response()->json(['data' => $productimage], 201);
        } catch (\Exception $e) {
            \Log::error('Error: '.$e->getMessage());
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $productImage = Productimage::where('product_id', $id)->first();
        if (!$productImage || !$productImage->thumbnail) {
            return response()->json(['message' => 'Product image not found'], 404);
        }
        $image = $productImage->thumbnail;
        if (!Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Image file not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
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
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }else{
            $productImage = ProductImage::findOrFail($id);
            if ($request->hasFile('thumbnail')) {
                if ($productImage->thumbnail && Storage::disk('public')->exists($productImage->thumbnail)) {
                    Storage::disk('public')->delete($productImage->thumbnail);
                }
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $thumbnailPath = $request->file('thumbnail')->storeAs('images', $imageName, 'public');
                $productImage->thumbnail = $thumbnailPath;
            }

            $productImage->save();
            return response()->json(['message' => 'Product image updated successfully', 'data' => $productImage], 200);
        }
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $productImage = ProductImage::findOrFail($id);
            $productImage->delete();

            return response()->json(['message' => 'Product image deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting product image'], 500);
        }
    }

}
