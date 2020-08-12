<?php

use Illuminate\Support\Facades\Route;
use App\category;
use App\Mail\registration;
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

Route::get('/', function () {
   
   
    return view('pages.home');
  
})->middleware('services');
Route::get('/email', function () {
   
   Mail::to('c@g.co')->send(new registration());
    return new registration();
  
})->middleware('services');
Route::post('/pay', 'PaymentController@redirectToGateway')->name('pay');
Route::get('/about', function(){
 return view('pages.about');
})->name('about');


Route::get('/dashboard/login','users@login');
Route::get('/dashboard/forgot','users@forgot');
Route::get('/dashboard/register','users@register');
Route::get('/dashboard/reset/{email}/','users@reset');


Route::get('/donate/{category?}/{project?}',"donors@showWeb")->name('donations');
Route::get('/services/{section?}', "services@index" )->name('services')->middleware('services');
Route::get('/news/{section?}', "services@news" )->name('news');
