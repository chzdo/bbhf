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
            $section_temp = explode(" ",base64_decode($section));
            $throw = implode("_",$section_temp);
              return view('pages.services',['scroll'=>true,'section'=>strval($throw)]);
       
    }

  
}
