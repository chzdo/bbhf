<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\projects;
use App\category;
use App\donation;
use App\Exceptions;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\donorValid;
use Carbon\Carbon;
use Unicodeveloper\Paystack\Facades\Paystack;
class donors extends Controller
{
  
    function __construct()
    {
          
    }
    function index(donorValid $req){
            


    }

    function showWeb(Request $req){
        $cat = null;
        $pro = null;
        if($req->category != null){
         $category =    category::where('id',$req->category)->firstorFail();
      
        }
    

        if($req->project != null){
            
            $proj =   projects::where('id', $req->project)->where('category',$req->category)->firstorFail();
               //$pro = $proj->id; 
                
        }
         
        return view('pages.donate',["category"=>$req->category,"project"=>$req->project]);
    }

    public function verify(Request $req)
    {
        
        try{
        $paymentDetails = Paystack::getPaymentData();
        return   response()->json(["code"=>1,"message"=>$paymentDetails],200);
        }
        catch(\Exception $e){
            return response()->json(['code'=>0,"message"=>"something went wrong"],500);
        }
     
        // Now you have the payment details,
        // you can store the authorization_code in your db to allow for recurrent subscriptions
        // you can then redirect or do whatever you want
    }



    function create(donorValid $req){
                try{
        $validated = $req->validated();    
       $validated['date_donated'] = Carbon::now()->toDateTimeString(); 
       $validated['donation_status'] = 1;   
       $a = donation::create($validated);
       if ($a->exists()){

         return   response()->json(['code'=>1 ,"message"=>"Donation saved successfully"],200);

       }
       return   response()->json(['code'=>0 ,"message"=>"Donation did not store"],500);
           
    }catch(\Exception $e){
   return  response()->json(['code'=>0,"message"=>"Something went wrong! try again later"],211);
}
}
}
//mysql://b6630290a32e44:255768cc@us-cdbr-east-02.cleardb.com/heroku_ae38d31cfe81fb1?reconnect=true