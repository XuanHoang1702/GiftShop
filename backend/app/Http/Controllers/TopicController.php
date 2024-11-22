<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Topic;
use Illuminate\Support\Facades\Validator;


class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Topic::where('status',1 )->get();
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
            'name' => 'string|required|unique:topic,name',
            'slug'=>'string|required',
            'sort_order'=>'integer|nullable',
            'created_by'=>'integer|required',
            'updated_by'=>'integer|required',
            'status'=>'integer|nullable',
        ]);

        if($validator->fails())
        {
            return response()->json(["error"=>$validator->errors()], 422);
        }else{
            $topic = Topic::create([
                'name' => $request->name,
                'slug' => $request->slug,
                'sort_order' => $request->sort_order,
                'created_by' => $request->created_by,
                'updated_by' => $request->updated_by,
                'status' => $request->status,
            ]);

            return response()->json([
                'data'=>$topic,
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $topic = Topic::find($id);
        if(!$topic){
            return response()->json(["error"=>"Topic undefind"], 422);
        }else{
            return $topic;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */public function destroy(string $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json(['message' => 'topic not found'], 404);
        }
        $topic->delete();
        return response()->json(['message' => 'topic deleted successfully'], 200);
    }

    public function putTrash($id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json(['message' => 'topic not found'], 404);
        }

        $topic->status = 2;
        $topic->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Topic::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $topic = Topic::find($id);
        if($topic == null)
        {
            $result =[
                'status'=>false,
                'message'=>'topic not found',
                'topic'=>$topic
            ];
        } elseif($topic->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'topic'=>null
            ];
        }
        else
        {
            $topic->status = 1;
            $topic->updated_by =  1;
            $topic->updated_at =  date('Y-m-d H:i:s');
            $topic->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'topic'=>$topic
            ];
        }
        return response()->json($result);
    }
}
