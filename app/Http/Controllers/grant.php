<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class grant extends Controller
{
    //

    function create(Request $req){
      
        $validate = Validator::make(
            $req->all(),
            [
                'title' => 'bail|required|max:50',
                'publication' => 'required',
                'image' => 'bail|required|image',
                'type' => 'bail|required'

            ]
        );


        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }
        $p =    $req->file('image')->store('opportunity', ['disk' => 'public']);
        $image= Storage::url($p);

       


        $value =      $req->all();
        unset($value['image']);
     
        $value['image'] =  $image;
        
        $project =   \App\opportunity::create($value);
        if ($project->exists()) {
            return response()->json(['code' => 1, 'message' => 'Created']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }

    function list(Request $re){
        $opp =  \App\opportunity::all();
        return response()->json(['code' => 1, 'message' => $opp]);
    }

    function listwinners(Request $re){
        $opp =  \App\opportunity::all()->where('status',0);
        return response()->json(['code' => 1, 'message' => $opp]);
    }
    function grant($id){
        $validate = Validator::make(['id'=>$id],['id'=>'bail|required|numeric|exists:opportunities,id']);

        if($validate->fails()){
          return response()->json(['code'=>2, 'message'=>'Not found']);
        }
  $opp =  \App\opportunity::where('id',$id)->firstorFail();
  return response()->json(['code' => 1, 'message' => $opp]);
    }

    function update(Request $req){
        $validate = Validator::make(
            $req->all(),
            [
                'title' => 'bail|required|max:50',
                'publication' => 'required',
                'image' => 'bail|required',
                'type' => 'bail|required',
                'id'=>'bail|required|exists:opportunities,id'

            ]
        );


        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }
        if($req->hasFile('image')){
        $p =    $req->file('image')->store('opportunity', ['disk' => 'public']);
        $image= Storage::url($p);
        }
       
         

        $value =      $req->all();
        if ($req->hasFile('image')) {
            unset($value['image']);
            $value['image'] =  $image;
        }
      
     
      
        
        $project =   \App\opportunity::where('id',$req->id)->first();

       
        $project->publication = $value['publication'];
        $project->image = $value['image'];
        $project->type = $value['type'];
        if ($project->save()) {
            return response()->json(['code' => 1, 'message' => 'updated']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }

    function active($id,$status){
        $project =   \App\opportunity::where('id',$id)->first();
        $project->status = $status;
        if ($project->save()) {
            return response()->json(['code' => 1, 'message' => 'updated']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }

    function application($id){
        $validate = Validator::make(['id'=>$id],['id'=>'bail|required|numeric|exists:opportunities,id']);

        if($validate->fails()){
          return response()->json(['code'=>2, 'message'=>'Not found']);
        }
        $payload =   \App\opportunity::where('id',$id)->first()->status;
        $project = \App\gApply::where('grant',$id)->get();
        return response()->json(['code' => 1, 'message' =>["data"=> $project ,"payload"=>$payload]]);
    }

    function winners($id){
        $validate = Validator::make(['id'=>$id],['id'=>'bail|required|numeric|exists:opportunities,id']);
        $payload =   \App\opportunity::where('id',$id)->first()->status;
        if($validate->fails()){
          return response()->json(['code'=>2, 'message'=>'Not found']);
        }
        $project = \App\gApply::where('grant',$id)->where('status',1)->get();
        return response()->json(['code' => 1, 'message' =>["data"=> $project ,"payload"=>$payload]]);
    }

    function accept($id){
        $project = \App\gApply::where('id',$id)->firstorFail();
        $project->status = 1;
        if ($project->save()) {
            $data = \App\gApply::where('grant',$project->grant)->get();
            return response()->json(['code' => 1, 'message' => $data]);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
        
    }
}
