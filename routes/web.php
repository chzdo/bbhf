<?php

use Illuminate\Support\Facades\Route;
use App\category;
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
Route::post('/pay', 'PaymentController@redirectToGateway')->name('pay');
Route::get('/about', function(){
 return view('pages.about');
})->name('about');
Route::get('/donate/{category?}/{project?}',"donors@showWeb")->name('donations');
Route::get('/services/{section?}', "services@index" )->name('services')->middleware('services');
Route::get('/news/{section?}', "services@news" )->name('news');
