<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productstore;
use Illuminate\Support\Facades\Validator;

class ProductStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $store_products = Productstore::where('status',1)->with('product')->get();
        return response()->json($store_products);
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
            'price_root' => 'numeric',
            'qty' => 'required|integer',
            'dateimport' => 'required|date',
            'status' => 'nullable|integer|in:1,2'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            $productstore = Productstore::create([
                'product_id' => $request->product_id,
                'priceroot' => $request->priceroot,
                'qty' => $request->qty,
                'dateimport' => $request->dateimport,
                'status' => $request->status,
            ]);

            return response()->json($productstore, 201);
        } catch (\Exception $e) {
            \Log::error('Error: '.$e->getMessage());
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Productstore::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Productstore::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }


    public function putTrash($id)
    {
        $store_product = Productstore::find($id);
        if (!$store_product) {
            return response()->json(['message' => 'store_product not found'], 404);
        }

        $store_product->status = 2;
        $store_product->save();
        return response()->json(['message' => 'Successfully'], 200);
    }
    public function restore($id)
    {
        $store_product = Productstore::find($id);
        if($store_product == null)
        {
            $result =[
                'status'=>false,
                'message'=>'store_product not found',
                'store_product'=>$store_product
            ];
        } elseif($store_product->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'store_product'=>null
            ];
        }
        else
        {
            $store_product->status = 1;
            $store_product->updated_at =  date('Y-m-d H:i:s');
            $store_product->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'store_product'=>$store_product
            ];
        }
        return response()->json($result);
    }
}
