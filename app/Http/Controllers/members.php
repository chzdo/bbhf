<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\users;
class members extends Controller
{

  public $role_id = 2;
  function application(){
     
 $apply =    \App\register::where('role_id',$this->role_id)->whereHas('application',function(Builder $query){
     $query->where('status',0);
 })->get();

    return response()->json(['code'=>1,'message'=>$apply]);
 


  }

  function applicationID(Request $req){
     
     
    $application =  \App\application::where('email',$req->id)->firstorFail();

    return response()->json(['code'=>1,"message"=>$application]);

  }
  function members(){
        
       $members = users::where('role_id',$this->role_id)->get();
                  
       return response()->json(['code'=>1,'message'=>$members]);

  }

}
