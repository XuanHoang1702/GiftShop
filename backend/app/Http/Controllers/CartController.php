<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Symfony\Component\Translation\Test\ProviderFactoryTestCase;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = auth()->user()->id;
        if (!$user_id) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $cart = Cart::where('user_id', $user_id)
                    ->with('product')
                    ->get();

        $cartData = $cart->map(function ($item) {
            return [
                'cart_id' => $item->id,
                'product_id' => $item->product->id,
                'product_name' => $item->product->name,
                'price' => $item->product->pricebuy,
                'quantity' => $item->quantity,
                'total_price' => $item->quantity * $item->product->pricebuy,
            ];
        });

        return response()->json(['data' => $cartData], 200);
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
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validate = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        } else {
            $cart = Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
            ]);

            $product = Product::find($request->product_id);

            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            $data = [
                'user_id' => $cart->user_id,
                'product_id' => $request->product_id,
                'product_name' => $product->name,
                'product_price' => $product->pricebuy,
                'quantity' => $cart->quantity,
            ];

            return response()->json([
                'message' => 'Product added to cart successfully',
                'data' => $data,
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
    public function destroy($id)
    {
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();
        if ($cartItem) {
            $cartItem->delete();
            return response()->json([
                'message' => 'Item removed from cart successfully.'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Item not found in cart or does not belong to the user.'
            ], 404);
        }
    }
}
