<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productsale;
use Illuminate\Support\Facades\Validator;

class ProductSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sale = Productsale::where('status',1)->with('product')->get();
        return response()->json($sale);
    }

    /**
     * Show the form for creating a new resource.s
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
        $validate = Validator::make($request->all(),[
            'product_id' => 'required|exists:products,id',
            'pricesale' => 'required|numeric',
            'datebegin' => 'required|date',
            'dateend' => 'required|date|after_or_equal:datebegin',
            'status' => 'required|boolean',
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 422);
        }else{
            $discount = Productsale::create([
                'product_id' => $request->product_id,
                'pricesale' => $request->pricesale,
                'datebegin' => $request->datebegin,
                'dateend' => $request->dateend,
                'status' => $request->status,
            ]);

            return response()->json([
                'message' => 'Discount created successfully',
                'discount' => $discount
            ], 201);
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
        $productSale = ProductSale::find($id);
        if(!$productSale){
            return response()->json(['error'=>'ProductSale not found'], 404);
        }else{
            try{
                $productSale->delete();
                return response()->json(['message'=>'delete success'], 201);
            }catch(\Exception $e){
                return response()->json(['error'=>'delete failed'], 500);
            }
        }
    }

    public function getTrash()
    {
        $trash = ProductSale::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }


    public function putTrash($id)
    {
        $product_sale = ProductSale::find($id);
        if (!$product_sale) {
            return response()->json(['message' => 'product_sale not found'], 404);
        }

        $product_sale->status = 2;
        $product_sale->save();
        return response()->json(['message' => 'Successfully'], 200);
    }
    public function restore($id)
    {
        $product_sale = ProductSale::find($id);
        if($product_sale == null)
        {
            $result =[
                'status'=>false,
                'message'=>'product_sale not found',
                'product_sale'=>$product_sale
            ];
        } elseif($product_sale->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'product_sale'=>null
            ];
        }
        else
        {
            $product_sale->status = 1;
            $product_sale->updated_at =  date('Y-m-d H:i:s');
            $product_sale->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'product_sale'=>$product_sale
            ];
        }
        return response()->json($result);
    }
}
