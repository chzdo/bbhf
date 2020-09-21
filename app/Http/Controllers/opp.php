<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class opp extends Controller
{
    function index(){

        $opp = \App\opportunity::where('status',1)->get();
        return view('pages.opp', compact('opp'));
    }

    function full($id){
 
        $opp = null;
        $news = \App\opportunity::where('id',$id)->where('status',1)->firstorFail();
        return view('pages.fullopp', compact('news'));
    }

    function apply(Request $req){

        Validator::make($req->all(),
        [
                 "fullname" => 'bail|required',
                 "phone_number" => 'bail|required|max:11|min:11',
                 "email" => 'bail|required|email',
                 "grant" =>'bail|required|numeric|exists:opportunities,id',
                 "file" => 'bail|required|file'

        ]
        
        )->validate();
      \App\opportunity::where('status',1)->where('id',$req->grant)->firstorFail();
       $file =  $req->file->store('grant', ['disk'=>'public']);
       $file_url = Storage::url($file);

       $value = $req->input();
       $value['file'] = $file_url;
       $apply = \App\gApply::create($value);
        if($apply->exists()){
            return back()->with(['message'=>"Thank You. We will Contact you"]);
        }

    }
}
