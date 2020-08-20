<?php

use Illuminate\Support\Facades\Route;
use App\category;
use App\Mail\registration;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('/auth','users@auth');
Route::get('/', function () {
   
   
    return view('pages.home');
  
})->middleware('services');
Route::get('/email', function () {

  $v = Mail::to('chido.nduaguibe@gmail.com')->send(new registration("stanley",1));

   if (Mail::failures()) {
    // return failed mails
    return new Error(Mail::failures()); 
}
    return new registration("stanley",1);
  
})->middleware('services');
Route::post('/pay', 'PaymentController@redirectToGateway')->name('pay');
Route::get('/about', function(){
 return view('pages.about');
})->name('about');


Route::get('/dashboard/login','users@login')->name('login');
Route::get('/dashboard/forgot','users@forgot');
Route::get('/dashboard/register','users@register');
Route::get('/dashboard/reset/{email}/','users@reset');
Route::get('dasboard/continue/{id}','users@confirm')->name('confirm');

Route::get('/donate/{category?}/{project?}',"donors@showWeb")->name('donations');
Route::get('/services/{section?}', "services@index" )->name('services')->middleware('services');
Route::get('/news/{section?}', "services@news" )->name('news');
