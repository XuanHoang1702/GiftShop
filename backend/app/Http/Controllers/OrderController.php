<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $orderDetails = OrderDetail::whereHas('order', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('product:id,name')
            ->get(['id', 'order_id', 'product_id', 'quantity', 'price']);

        $data = $orderDetails->map(function ($detail) {
            return [
                'id' => $detail->id,
                'order_id' => $detail->order_id,
                'product_id' => $detail->product_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'product_name' => $detail->product->name,
                'status' => $detail->order->status,
                'date' => $detail->order->created_at,
            ];
        });

        return response()->json(['order_details' => $data]);
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
        $user = Auth::user();
        $validate = Validator::make($request->all(), [
            'total_quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'status' => 'nullable|string',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        } else {
            $order = Order::create([
                'user_id' => $user->id,
                'total_quantity' => $request->total_quantity,
                'total_price' => $request->total_price,
                'status' => $request->status ?? 'Pending',
            ]);

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order,
            ], 201);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show()
{
    $orders = Order::with('user')->get();
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

    public function getTrash()
    {
        $trash = Order::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }


    public function putTrash($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'order not found'], 404);
        }

        $order->status = 2;
        $order->save();
        return response()->json(['message' => 'Successfully'], 200);
    }
    public function restore($id)
    {
        $order = Order::find($id);
        if($order == null)
        {
            $result =[
                'status'=>false,
                'message'=>'order not found',
                'order'=>$order
            ];
        } elseif($order->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'order'=>null
            ];
        }
        else
        {
            $order->status = 1;
            $order->updated_at =  date('Y-m-d H:i:s');
            $order->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'order'=>$order
            ];
        }
        return response()->json($result);
    }
}
