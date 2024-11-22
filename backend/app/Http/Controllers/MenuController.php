<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::where('status', 1)->get();
        return response()->json($menus);
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
            'name' => 'string|required|unique:categories,name',
            'link' => 'string|required',
            'table_id'=>'integer|nullable',
            'type' => 'string|nullable',
            'position'=>'string|nullable',
            'parent_id' => 'integer',
            'sort_order' => 'integer|nullable',
            'description'=>'string|nullable',
            // 'created_by' => 'integer|required',
            // 'updated_by' => 'integer|required',
            'status' => 'integer|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        } else {
            $menu = Menu::create([
                'name' => $request->name,
                'link' => $request->link,
                'table_id' => $request->table_id,
                'type' => $request->type,
                'position' => $request->position,
                'parent_id' => $request->parent_id,
                'sort_order' => $request->sort_order ?? 0,
                // 'created_by' => $request->created_by,
                // 'updated_by' => $request->updated_by,
                'status' => $request->status,
            ]);

            $menu->load('parentMenu');

            return response()->json([
                'message' => 'menu created successfully',
                'data' => $menu,
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu not found'], 404);
        }else{
            return response()->json($menu);
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
            'name' => 'string|nullable|unique:categories,name,' . $id,
            'link' => 'string|nullable',
            'table_id' => 'integer|nullable',
            'type' => 'string|nullable',
            'position' => 'string|nullable',
            'parent_id' => 'integer|nullable',
            'sort_order' => 'integer|nullable',
            'description' => 'string|nullable',
            'status' => 'integer|nullable',
        ]);

        $record = Menu::findOrFail($id);
        $record->name = $validatedData['name'];
        $record->link = $validatedData['link'];
        $record->table_id = $validatedData['table_id'] ?? $record->table_id;
        $record->type = $validatedData['type'] ?? $record->type;
        $record->position = $validatedData['position'] ?? $record->position;
        $record->parent_id = $validatedData['parent_id'] ?? $record->parent_id;
        $record->sort_order = $validatedData['sort_order'] ?? $record->sort_order;
        $record->description = $validatedData['description'] ?? $record->description;
        $record->status = $validatedData['status'];

        $record->save();

        return response()->json([
            'message' => 'Record updated successfully!',
            'data' => $record,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $menu = Menu::find($id);
        if($menu){
            $menu->delete();
            return response()->json(['message' => 'Menu deleted successfully'], 200);
        }else{
            return response()->json(['error' => 'Menu not found'], 404);
        }
    }

    public function putTrash($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['message' => 'menu not found'], 404);
        }

        $menu->status = 2;
        $menu->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Menu::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result =[
                'status'=>false,
                'message'=>'menu not found',
                'menu'=>$menu
            ];
        } elseif($menu->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'menu'=>null
            ];
        }
        else
        {
            $menu->status = 1;
            $menu->updated_by =  1;
            $menu->updated_at =  date('Y-m-d H:i:s');
            $menu->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'menu'=>$menu
            ];
        }
        return response()->json($result);
    }
}
