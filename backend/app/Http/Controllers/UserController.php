<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('status', 1)->get();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = auth()->user();
        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15',
            'password' => 'required|string|min:8',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }else{
            $imageName = null;
            if ($request->hasFile('image')) {
                $imageName = $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('images', $imageName, 'public');
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'image' => $imageName,
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'message' => 'User registered successfully.',
                'user' => $user,
                'token' => $token,
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,'.$id,
            'phone' => 'nullable|string|max:20|unique:users,phone,'.$id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'nullable|string'.$id,
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }else{
            $user = User::findOrFail($id);
            $imageName = null;
            if ($request->hasFile('image'))
            {
                if ($user->image) {
                    Storage::disk('public')->delete('images/' . $user->image);
                }
                $imageName = $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('images', $imageName, 'public');
            }
            $user->name = $request->name ?? $user->name;
            $user->email = $request->email ?? $user->email;
            $user->phone = $request->phone ?? $user->phone;
            $user->address = $request->address ?? $user->address;
            $user->save();
            return response()->json([
                'message' => 'User updated successfully.',
                'user' => $user,
            ], 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'user deleted successfully'], 200);
    }


    public function createUser(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15',
            'address' => 'required|string',
            'gender' => 'required|string|in:Male, Female'
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'gender' => $request->gender,
            ]);
            return response()->json($user,201);
        }
    }

    public function getUserProfile($id)
    {
        $user = User::find($id);
        $image = $user->image;
        if (!$image || !Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Product image not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");

        return response()->file($imagePath);
    }

    public function putTrash($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);
        }

        $user->status = 2;
        $user->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = User::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $user = User::find($id);
        if($user == null)
        {
            $result =[
                'status'=>false,
                'message'=>'user not found',
                'user'=>$user
            ];
        } elseif($user->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'user'=>null
            ];
        }
        else
        {
            $user->status = 1;
            $user->updated_at =  date('Y-m-d H:i:s');
            $user->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'user'=>$user
            ];
        }
        return response()->json($result);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)
                    ->where('phone', $request->phone)
                    ->first();

        if ($user) {
            return response()->json(['user_id' => $user->id], 200);
        } else {
            return response()->json(['error' => 'Email or phone number is incorrect.'], 404);
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::find($request->user_id);
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.'], 200);
    }
}
