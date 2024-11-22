<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contact = Contact::where('status', 1)->get();
        return response()->json($contact);
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

    public function email(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'email|required|exists:users,email',
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }else{
            $user = User::where('email', $request->email)->first();;
            return response()->json(['id'=>$user->id]);
        }
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'user_id'=>'integer|exists:users,id',
            'title'=>'string|required',
            'contents'=>'string|required',
            'reply_id'=>'integer|nullable',
            'created_by'=>'integer|nullable',
            'updated_by'=>'integer|nullable',
            'status'=>'integer|nullable',
        ]);

        if($validator->fails()){
            return response()->json(["error"=>$validator->errors()], 422);
        }else{
            $contact = Contact::create([
                'user_id'=>$request->user_id,
                'title'=>$request->title,
                'content'=>$request->contents,
                'reply_id'=>$request->reply_id,
                'status'=>$request->status,
            ]);
            return response()->json(["message"=>$contact]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $contact = Contact::find($id);
        if(!$contact){
            return response()->json(['error'=>'Contact not found'], 422);
        }else{
            return response()->json(['contact'=>$contact]);
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'user_id' => 'nullable|exists:users,id',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'reply_id' => 'nullable|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        $dataToUpdate = $request->only([
            'user_id', 'title', 'content', 'reply_id'
        ]);
        $contact->update($dataToUpdate);
        return response()->json(['message' => 'Contact updated successfully', 'contact' => $contact], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        $contact->delete();
        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }

    public function putTrash($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'contact not found'], 404);
        }

        $contact->status = 2;
        $contact->save();
        return response()->json(['message' => 'Successfully'], 200);
    }


    public function getTrash()
    {
        $trash = Contact::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }

    public function restore($id)
    {
        $contact = Contact::find($id);
        if($contact == null)
        {
            $result =[
                'status'=>false,
                'message'=>'contact not found',
                'contact'=>$contact
            ];
        } elseif($contact->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'contact'=>null
            ];
        }
        else
        {
            $contact->status = 1;
            $contact->updated_by =  1;
            $contact->updated_at =  date('Y-m-d H:i:s');
            $contact->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'contact'=>$contact
            ];
        }
        return response()->json($result);
    }


    public function reply(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $contact = Contact::findOrFail($id);
        $contact->update([
            'reply_id' => 2,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return response()->json(['message' => 'Reply sent successfully', 'contact' => $contact]);
    }


    public function getRepliesForUser($userId)
    {
        $replies = Contact::where('user_id', $userId)
                        ->where('reply_id', 2)
                        ->get();

        return response()->json($replies);
    }



}
