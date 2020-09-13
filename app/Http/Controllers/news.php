<?php

namespace App\Http\Controllers;

use App\news as gist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class news extends Controller
{
    


    function create(Request $re){
     $validate = Validator::make(
         $re->all(),
         [
             'title'=>'bail|required|max:30',
             'news'=>'required',
             'image_1'=>'bail|required|image',
             'image_2'=>'image'
         ]
         );
    

        if($validate->fails()){
            return response()->json(['code'=>0, 'message'=>$validate->errors()]);
        }
        $p =    $re->file('image_1')->store('news',['disk'=>'public']);
        $image_1 = Storage::url($p);

        if ($re->hasFile('image_2')){
          $pp =   $re->file('image_2')->store('news',['disk'=>'public']);
          $image_2 = Storage::url($pp);
            }

        
     $value =      $re->all();
     unset($value['image_1']);
     unset($value['image_2']);
     $value['image_1'] =  $image_1 ;
     if ($re->hasFile('image_2')){  $value['image_2'] =  $image_2 ;}
     $project =   gist::create($value);
     if($project->exists()){
        return response()->json(['code'=>1, 'message'=>'News Created']);
     }
     return response()->json(['code'=>0, 'message'=>'Something went wrong']);
    }


    function update(Request $re){
        $validate = Validator::make(
            $re->all(),
            [
                'id'=> 'bail|exists:news,id',
                'title'=>'bail|required|max:30',
                'news'=>'required',
                'image_1'=>'bail|required',
               
            ]
            );
       
   
           if($validate->fails()){
               return response()->json(['code'=>0, 'message'=>$validate->errors()]);
           }
         if ($re->hasFile('image_1')) {  
              $p =  $re->file('image_1')->store('news',['disk'=>'public']);
           $image_1 = Storage::url($p);
           }
   
           if ($re->hasFile('image_2')){
             $pp =   $re->file('image_2')->store('news',['disk'=>'public'])  ;
             $image_2 = Storage::url($pp);
               }
            
           
        $value =      $re->all();
      
        $value['image_1'] = isset($image_1) ? $image_1: $value['image_1'] ;
        $value['image_2'] =  isset($image_2)? $image_2: $value['image_2'] ;
        $news =   gist::findorFail($value['id'])->first();
        $news->news = $value['news'];
        $news->category = $value['category'];
        $news->image_1 = $value['image_1'];
        $news->image_2 = $value['image_2'];
        if($news->save()){
           return response()->json(['code'=>1, 'message'=>'News Updated']);
        }
        return response()->json(['code'=>0, 'message'=>'Something went wrong']);
    }
    function list(){
  $new =  gist::all()->toArray();
  return response()->json(['code'=>1, 'message'=>$new]);
    }

    function new(){
        $new =  gist::where('status', 0)->get();
        return response()->json(['code'=>1, 'message'=>$new]);
    }

    function news($id){
             $new = gist::findOrFail($id)->first();
             return response()->json(['code'=>1, 'message'=>$new]);
    }
    function approve($id,$status){

       if(!in_array($status,[1,2])) {
            return  response()->json(['code'=>0, 'message'=>"Invalid Request"]);
       }
        $new = gist::findOrFail($id)->first();
        $new->status = $status;
        if ($new->save()){
            return response()->json(['code'=>1, 'message'=>"Approval Status Updated"]);
        }
        return  response()->json(['code'=>0, 'message'=>"Something went wrong"]);
    }

  



}
