<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/category', function(){
$result =    App\category::select('id','category')->get();
return response()->json(['code'=>1,"message"=>$result]);
});
Route::get('/roles', function(){
    $result = App\Role::all();
    return response()->json(['code'=>1,"message"=>$result]);
});
/**  Donation Routes */
Route::post('/donation/create',"donors@create");
Route::get('/donation/payment/verify/',"donors@verify");


Route::get('/category/{category_id}/project', function(Request $req){
   try{
   $result =   App\category::findorFail($req->category_id)->projects()->get();

    return response()->json(['code'=>1,'message'=>$result],200);
   }catch(Exception $ex){
    return  response()->json(["code"=>0,"message"=>"Not Found"],404);
   }
   });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/i',function(Request $req){
    var_dump($req->input());
});
Route::post('/register',"users@create");

Route::fallback(function(){
    return response()->json(['code'=>0, "message"=>"page not found"]);
});
