<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\register;
use App\Http\Requests\validateReg;
class users extends Controller
{

    
    function login(){
        return view('pages.dashboard.join');
    }
    function register(){
        return view('pages.dashboard.register');
    }
    function reset(Request $req){
        return view('pages.dashboard.reset');
    }
    function forgot(){
        return view('pages.dashboard.forgot');
    }

    function create(validateReg $request){
    $validate = $request->validated();
     $result = register::create($validate);
     if($result->exists()){
        return   response()->json(['code'=>1 ,"message"=>"Check Your mail to continue"],200);
     }
    }
}
