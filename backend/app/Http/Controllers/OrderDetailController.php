<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orderdetail;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order_details = Orderdetail::all();
        return response()->json($order_details);
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
        $validate = Validator::make($request->all(), [
            'order_id' => 'required|integer|exists:orders,id',
            'order_details' => 'required|array',
            'order_details.*.product_id' => 'required|integer|exists:products,id',
            'order_details.*.quantity' => 'required|integer|min:1',
            'order_details.*.price' => 'required|numeric|min:0',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        } else {
            $order = Order::find($request->order_id);
            $user_id = $order->user_id;
            foreach ($request->order_details as $detail) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                ]);
            }

            foreach ($request->order_details as $detail) {
                DB::table('carts')
                    ->where('user_id', $user_id)
                    ->where('product_id', $detail['product_id'])
                    ->delete();
            }

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order,
            ], 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $orders = Order::with(['orderdetail.product'])
            ->where('user_id', $id)
            ->get();
        return response()->json($orders);
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
        //
    }
}
