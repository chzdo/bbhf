<?php

namespace App\Http\Controllers;

use Error;
use App\Role;
use App\login;
use App\register;
use App\users as user;
use App\Mail\registration;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\validateReg;
use App\Mail\registration_sponsor;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Validator;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class users extends Controller
{


    function login()
    {
        return view('pages.dashboard.join');
    }
    function register()
    {
        return view('pages.dashboard.register');
    }
    function reset(Request $req)
    {
        return view('pages.dashboard.reset');
    }
    function forgot()
    {
        return view('pages.dashboard.forgot');
    }

    function create(validateReg $request)
    {
        $validate = $request->validated();
        try {

            if ($validate['role_id'] == 21) {
                $count = (int) \App\users::all()->count();
                $zeros = "000";
                if ($count >= 9){
                    $zeros = "00";
                }else if ($count >= 99){
                    $zeros = "0";
                }else if ($count >= 999){
                    $zeros = "";
                }
                $validate['user_number'] = "S".$zeros.(++$count);
            
                $result = user::create($validate);
                if ($result->exists()) {
                
                    $login_validated = FacadesValidator::make(['users_email' => $result->email], ["users_email" => 'bail|unique:logins|exists:users,email|email|required'])->validate();
                   
                    $login = new login();
                    $login->users_email = $login_validated['users_email'];
                     $pass =  Str::random(10);

                    $login->password = Hash::make($pass);
                    
                    $login->save();
                    if ($login->exists()) {
                 
                        Mail::to($result->email)->send(new registration_sponsor($result->first_name, $pass));
                        if (Mail::failures()) {
                            return   response()->json(['code' => 0, "message" => Mail::failures()], 400);
                        }
                    } else {
                        $result->delete();
                        return   response()->json(['code' => 0, "message" => "Something went wrong! try Again"], 400);
                    }
                }
            } else {
                $result = register::create($validate);
                if ($result->exists()) {
                    Mail::to($result->email)->send(new registration($result->first_name, base64_encode($result->email)));
                    if (Mail::failures()) {
                        return   response()->json(['code' => 0, "message" => Mail::failures()], 400);
                    }
                }
            }
            return   response()->json(['code' => 1, "message" => "Check Your mail to continue"], 200);
        } catch (\Exception $e) {
            return \response()->json(['code' => 0, "message" => $e->getMessage()], 500);
        }
    }

    function confirm(Request $req)
    {


        register::where('email', base64_decode($req->id))->firstorFail();
        return View('pages.volunteer');
    }
    function auth(LoginRequest $req)
    {


        $cred = $req->validated();

        if (Auth::attempt($cred)) {
            echo 'hello';
            //  session('user',Auth::user()->users_email);

        } else {
            echo 'user not found';
        }
    }
}
