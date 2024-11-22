<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::where('status', 1) ->orderBy('created_at', 'desc')->get();
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
            'topic_id'=>'integer|required|exists:topic,id',
            'slug'=>'string|required',
            'content'=>'string|required',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'type'=>'string|nullable',
            'description'=>'string|nullable',
            'created_by'=>'integer|required',
            'updated_by'=>'integer|required',
            'status'=>'integer|nullable',
        ]);

        if($validator->fails()){
            return response()->json(["error"=>$validator->errors()], 422);
        }else{
            $imageName = null;
            if ($request->hasFile('thumbnail')) {
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->storeAs('images', $imageName, 'public');
            }
            $post = Post::create([
                'topic_id'=>$request->topic_id,
                'slug' => $request->slug,
                'content' => $request->content,
                'thumbnail' => $imageName,
                'type' => $request->type,
                'description' => $request->description,
                'created_by' => $request->created_by,
                'updated_by' => $request->updated_by,
                'status' => $request->status
            ]);
            return response()->json(['data'=>$post], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
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
        $post = Post::find($id);
        if(!$post){
            return response()->json(["Can not find post"]);
        }

        $validator = Validator::make($request->all(), [
            'topic_id' => 'nullable|integer|exists:topic,id',
            'slug' => 'nullable|string|max:255,' . $id,
            'content' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'type' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Error' => $validator->errors()], 404);
        }

        $dataToUpdate = $request->only([
            'topic_id', 'slug', 'content', 'thumbnail', 'type', 'description', 'status'
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($post->thumbnail) {
                Storage::delete('public/images/' . $post->thumbnail);
            }

            $fileName = $request->file('thumbnail')->getClientOriginalName();
            $request->file('thumbnail')->storeAs('images', $fileName, 'public');
            $dataToUpdate['thumbnail'] = $fileName;
        }
        $post->update($dataToUpdate);

        return response()->json(['message' => 'Post updated successfully!', 'post' => $post], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if(!$post){
            return response()->json(["error"=>"post not found"], 404);
        }else{
            $post->delete();
            return response()->json(["message"=>"post deleted successfully"], 200);
        }
    }

    public function getImagePost($id)
    {
        $post = Post::find($id);
        $image = $post->thumbnail;
        if (!$image || !Storage::disk('public')->exists("images/{$image}")) {
            return response()->json(['message' => 'Product image not found'], 404);
        }
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
    }

    public function putTrash($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'post not found'], 404);
        }

        $post->status = 2;
        $post->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Post::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $post = Post::find($id);
        if($post == null)
        {
            $result =[
                'status'=>false,
                'message'=>'post not found',
                'post'=>$post
            ];
        } elseif($post->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'post'=>null
            ];
        }
        else
        {
            $post->status = 1;
            $post->updated_by =  1;
            $post->updated_at =  date('Y-m-d H:i:s');
            $post->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'post'=>$post
            ];
        }
        return response()->json($result);
    }
}
