<?php

use GuzzleHttp\Middleware;
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
   //Route::post('/m','users@approve');
   Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', 'users@user');
    Route::middleware('admin')->group(function(){


        Route::get('/chat/message','chat@fetchMessages');
        Route::post('/chat/message','chat@sendMessage');
        Route::get('/chat/friends','chat@friends');
        Route::get('/video/meetings','chat@meetings');
        
       

        //members route
  
            Route::get('/members/application','members@application');
            Route::get('/members/application/{id}','members@applicationID');
            Route::post('/members/application/approve','users@approve');
            Route::get('/members/list','members@members');
            Route::get('/members/list/{id}','users@info');
            Route::post('/members/revoke','users@revoke');
            Route::post('/members/update','users@updateRole');
        

            //project
            Route::post('/projects/create','projects@createProject');
            Route::get('/projects/list','projects@list');
            Route::get('/donate/list','projects@donation');
            Route::get('/projects/list/{id}','projects@project');
            Route::post('/projects/active','projects@active');


            //news
             //project
             Route::post('/news/create','news@create');
             Route::get('/news/list','news@list');
             Route::get('/news/list/new','news@new');
             Route::get('/news/list/{id}','news@news');
             Route::post('/news/list/approve','news@approve');
             Route::post('/projects/active','news@active');


        //volunteer routes
       // volunteers
            Route::get('/volunteers/application','volunteers@application');
            Route::get('/volunteers/application/{id}','volunteers@applicationID');
            Route::post('/volunteers/application/approve','users@approve');
            Route::get('/volunteers/list','volunteers@members');
            Route::get('/volunteers/list/{id}','users@info');
            Route::post('/volunteers/revoke','users@revoke');
            Route::post('/volunteers/update','users@updateRole');
       
            
        
            Route::get('/sponsors/list','sponsors@members');
            Route::get('/sponsors/list/{id}','users@info');
            Route::post('/sponsors/revoke','users@revoke');
            Route::post('/sponsors/update','users@updateRole');

            Route::get('/admin/list','admin@members');
            Route::get('/admin/list/{id}','users@info');
            Route::post('/admin/revoke','users@revoke');
            Route::post('/admin/update','users@updateRole');
});
Route::get('/users/status','users@getstatus'); 
});


Route::post('/register',"users@create");
Route::post('/forgot',"users@requestRecovery");
Route::post('/reset','users@resetpassword');
Route::get('/zoomToken','chat@zoomAuth');



Route::fallback(function(){
    return response()->json(['code'=>0, "message"=>"page not found"]);
});
