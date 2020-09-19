<?php

use App\category;
use App\Events\websock;
use App\Jobs\SendEmail;
use App\Mail\rejection;
use App\Mail\registration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Carbon;

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

Route::post('/auth', 'users@auth');
Route::get('/', function () {

    $list =   DB::table('projects')->select('projects.id')->leftJoin('donation', 'donation.donation_project', '=', 'projects.id')

        ->selectRaw('sum(donation.donation_amount) as amount_raised, projects.*')->groupBy('projects.id')->orderByDESC('id')->take(5)->get();

    $news = \App\news::with('category:id,category')->with('author:email,first_name,last_name')->orderByDESC('id')->take(4)->get();
    $u = DB::table('urgentproject')->first();
    $urgent =   DB::table('projects')->where('projects.id', $u->project)->select('projects.id')->leftJoin('donation', 'donation.donation_project', '=', 'projects.id')

        ->selectRaw('sum(donation.donation_amount) as amount_raised, projects.*')->groupBy('projects.id')->orderByDESC('id')->first();

  
    return view('pages.home', compact('list', 'news', 'urgent'));
})->middleware('services');
Route::get('/email', function () {

    //$v = Mail::to('chido.nduaguibe@gmail.com')->send(new registration("stanley",1));

    // if (Mail::failures()) {
    // return failed mails
    // return new Error(Mail::failures()); 
    //}
    dispatch(new SendEmail('chido@c.j'));
    return new rejection("stanley");
})->middleware('services');
Route::post('/pay', 'PaymentController@redirectToGateway')->name('pay');
Route::get('/about', function () {
    return view('pages.about');
})->name('about');

Route::prefix('dashboard')->group(function () {
    Route::get('/login', 'users@login')->name('login')->middleware('check');
    Route::post('/login', 'users@auth')->name('auth');
    Route::get('/forgot', 'users@forgot');
    Route::get('/register', 'users@register');
    Route::get('/reset/{hash}', 'users@reset')->name('recovery')->where('hash', '.*');
    Route::get('/continue/{id}', 'users@confirm')->name('confirm');
    Route::post('/continue', 'users@continue');
    Route::get('/logout', 'users@logout');
    // Route::get('/in',function(){
    //  return view('dashboard.index');
    // })->middleware('auth')->name('dash');

    Route::view('/in/{path?}', 'dashboard.index')->middleware(['auth', 'checkrole'])->name('dash')->where('path', '.*');

    Route::view('/video', 'dashboard.video')->middleware(['auth', 'checkrole'])->name('video');
});
Route::get('demo', function () {
    Broadcast(new websock('some'));
    return view('pages.donate');
});
Route::get('/chat/meeting', 'chat@getAuth');
Route::get('/chat/zoomtoken', 'chat@createVideo');
Route::get('/zoomToken', 'chat@zoomAuth');
Route::get('/donate/{category?}/{project?}', "donors@showWeb")->name('donations');
Route::get('/services/{section?}', "services@index")->name('services')->middleware('services');
Route::get('/news', "news@index")->name('news');
Route::get('/news/{id?}', "news@full");
Route::get('/opportunities', "opp@index");
Route::get('/opportunities/{id?}', "opp@full");
Route::post('/opportunities/apply', "opp@apply");