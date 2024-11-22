<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Config;
use Illuminate\Support\Facades\Validator;

class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Config::all();
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
            'site_name'=>'string|required|unique:config,site_name',
            'email'=>'email|required|unique:config,email',
            'address'=>'string|required',
            'hotline'=>'string|required|max:13',
            'phone'=>'string|required|max:13',
            'author'=>'string|max:255|required',
            'status'=>'string|nullable',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()],402);
        }else{
            $config = Config::create($request->only([
                'site_name',
                'email',
                'address',
                'hotline',
                'phone',
                'author',
                'status',
            ]));

            return response()->json([
                'message'=>'Config created successfully',
                'data'=>$config,
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        $config = Config::find($id);
        if(!$config){
            return response()->json(["error"=>"Config not found"], 404);
        }else{
            return $config;
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
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'hotline' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'author' => 'nullable|string|max:255',
            'status' => 'nullable|boolean',
        ]);

        $config = Config::findOrFail($id);

        $config->update($validatedData);

        return response()->json([
            'message' => 'Configuration updated successfully!',
            'config' => $config,
        ]);
    }


    /**
     * Remove the specified resource from storage.s
     */
    public function destroy(string $id)
    {
        $config = Config::find($id);
        if(!$config){
            return response()->json(["error"=>"Config not found"], 404);
        }else{
            $config->delete();
            return response()->json(["message"=>"Config deleted successfully"], 200);
        }
    }
}
