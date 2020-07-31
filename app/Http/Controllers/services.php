<?php
namespace App;
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

class services extends Controller
{
    //
    function index($section=null){
        if($section==null){
            return view('pages.services')->with('scroll',false);
        }
        if(in_array($section,Config::get('constants.services_route'))){
              return view('pages.services',['scroll'=>true,'section'=>strval($section)]);
        }else{
            abort(404);
        }
    }
}
