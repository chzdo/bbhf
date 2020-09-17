<?php

namespace App\Http\Controllers;

use Error;
use App\Role;
use App\login;
use App\register;
use Carbon\Carbon;
use App\users as user;
use App\Mail\rejection;
use App\Mail\acceptance;
use App\Mail\registration;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\passwordrecovery;
use App\Http\Requests\validateReg;
use App\Mail\registration_sponsor;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Validator;
use App\Http\Requests\requestRecovery;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Session\Session;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Contracts\Validation\Validator as ValidationValidator;

class users extends Controller
{


    function login(Request $r)
    {

        return view('pages.dashboard.join');
    }
    function register()
    {
        return view('pages.dashboard.register');
    }

    function reset(Request $req)
    {
        $response = DB::table('passwordrecovery')->where('hash_code', $req->hash)
            ->first();
        if ($response == null) {
            abort(404);
        }
        if (!Carbon::createFromDate($response->expiry_date)->greaterThanOrEqualTo(Carbon::now())) {
            abort(419);
        }

        return view('pages.dashboard.reset', ['hash' => $response->hash_code]);
    }
    function user(Request $req)
    {
        $user =  Auth::user()->user;
        //$user =    \App\users::where('email',$req->input('email'))->firstorFail();
        return response()->json(['code' => 1, "message" => $user]);
    }
    function forgot()
    {
        return view('pages.dashboard.forgot');
    }
    function createUser($user, $id)
    {


        $ini = $user->role_id == 1 ? 'V' : ($user->role_id == 2 ? 'M' : ($user->role_id == 3 ? 'S' : 'A'));
        $count = (int) \App\users::all()->max('id');
        $zeros = "000";
        if ($count >= 999) {
            $zeros = "";
        } else if ($count >= 99) {
            $zeros = "0";
        } else if ($count >= 9) {
            $zeros = "00";
        }
        $user->user_number = $ini . $zeros . (++$count);
        $v = collect($user)->except('id');
        $u = $v->toArray();
        $validateUser = FacadesValidator::make(['email' => $u['email']], ['email' => "bail|required|unique:users,email|email"], ["email" => "This user already Exist"]);
        if ($validateUser->fails()) {
            return response()->json(['code' => 0, "message" => $validateUser->errors()]);
        }
        $result = user::create($u);

        if ($result->exists()) {

            $login_validated = FacadesValidator::make(['users_email' => $result->email], ["users_email" => 'unique:logins|email|exists:users,email|required']);
            if ($login_validated->fails()) {
                $result->delete();
                if ($id == 3) {
                    $user->application->where('status', 1)->first()->update(['status' => 0]);
                }
                return response()->json(['code' => 0, "message" => $login_validated->errors()]);
            }
            $login = new login();
            $login->users_email = $result->email;
            $pass =  Str::random(10);

            $login->password = Hash::make($pass);

            $login->save();
            if ($login->exists()) {
                try {
                    Mail::to($result->email)->send(new acceptance($result->first_name, $pass));
                } catch (\Exception $e) {
                    return   response()->json(['code' => 0, "message" => Mail::failures()], 215);
                }

                $message = ($id == 3) ? "Check your mail to continue" : "user created";
                return   response()->json(['code' => 1, "message" => "user created"]);
            } else {
                $result->delete();
                return   response()->json(['code' => 0, "message" => "Something went wrong! try Again"], 400);
            }
        }
    }
    function create(validateReg $request)
    {
        $validate = $request->validated();
        try {

            if ($validate['role_id'] == 3) {
                $this->createUser((object)$validate, 3);
            } else {
                $result = register::create($validate);
                if ($result->exists()) {
                    try {
                        Mail::to($result->email)->send(new registration($result->first_name, base64_encode($result->email)));
                    } catch (\Exception $e) {
                        $result->delete();
                        return   response()->json(['code' => 0, "message" => Mail::failures()], 215);
                    }
                }
            }
            return   response()->json(['code' => 1, "message" => "Check Your mail to continue"], 200);
        } catch (\Exception $e) {
            return \response()->json(['code' => 0, "message" => $e->getMessage()], 215);
        }
    }

    function confirm(Request $req)
    {

        register::where('email', base64_decode($req->id))->firstorFail();
        return View('pages.dashboard.complete')->with('email', base64_decode($req->id));
    }


    function continue(Request $req)
    {

        $v =  $this->validate($req, [
            "reason" => "bail|required|max:250",
            "about" => "bail|required|max:250",
            "contribute" => "bail|required|max:250",
            "strength" => "bail|required|max:250",
            "leadership" => "bail|required|max:250",
            "email" => "bail|required|email|exists:register,email"
        ], [
            "unique" => "You have already filled this form",
            "exists" => "This user does not exist ",
            "required" => "this field is required"
        ]);

        $check = \App\application::find($v['email']);

        if ($check != null && ($check->status == 0 || $check->status == 1)) {
            return back()->withInput()->with('error', 'You have already applied');
        }

        $result = \App\application::create($v);
        if ($result->exists()) {
            return back()->with('result', 'Thank you for completing your registration! we will contact you.');
        } else {
            return back()->withInput()->with('error', 'Something went wrong');
        }
    }
    function auth(LoginRequest $req)
    {


        $cred = $req->validated();



        if (Auth::attempt($cred, $req->input('rememberme'))) {

            $uri = null;
            $params = explode('?', url()->previous());
            if (count($params) > 1) {
                $uri = urldecode(explode("=", $params[1])[1]);
            }
            if (Auth::user()->status == 0) {
                Auth::logout();
                return response()->json(['code' => 0, "message" => "Your Account has been disabled!"]);
            }
            if (!Auth::user()->user->validRole()) {
                Auth::logout();
                return response()->json(['code' => 0, "message" => "Unauthorized Access"]);
            }
            if (Auth::user()->user == null) {
                Auth::logout();
                return response()->json(['code' => 0, "message" => "User information for this account not found"]);
            }


            return response()->json(['code' => 1, "message" => $uri]);
        } else {
            return response()->json(['code' => 0, "message" => "user not found"]);
        }
    }

    function requestRecovery(requestRecovery $req)
    {

        $validate = $req->validated();
        $date = Carbon::now();
        $expiry = $date->addHours(2);
        $hash = bcrypt($validate['email'] . $date->toObject()->timestamp);
        $response =  DB::table('passwordrecovery')->insert([
            "email" => $validate['email'],
            "hash_code" => $hash,
            "expiry_date" => $expiry
        ]);
        if (!$response) {
            return response()->json(['code' => 0, "message" => "Something went wrong"], 212);
        }

        try {
            Mail::to($validate['email'])->send(new passwordrecovery($hash));
        } catch (\Exception $e) {
            return   response()->json(['code' => 0, "message" => $e->getMessage()], 217);
        }
        return response()->json(['code' => 1, "message" => "Please Check your mail"], 200);
    }
    function resetpassword(Request $req)
    {

        $validated = $this->validate($req, [
            'password' => 'bail|required|min:8',
            'hash_code' => 'bail|required|exists:passwordrecovery,hash_code'
        ]);
        $p_data = DB::table('passwordrecovery')->where('hash_code', $validated['hash_code'])->first();
        if (!Carbon::createFromDate($p_data->expiry_date)->greaterThan(Carbon::now())) {
            return response()->json(['code' => 0, 'message' => 'Code has expired']);
        }

        $user = \App\login::where('users_email', $p_data->email)->firstorFail();

        $user->password = Hash::make($validated['password']);

        if ($user->save()) {
            return response()->json(['code' => 1, 'message' => 'Password Has been Changed']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }

    function logout()
    {
        Auth::logout();
        if (!Auth::check()) {
            return redirect()->route('login');
        }
    }

    function approve(Request $req)
    {

        $validate = FacadesValidator::make($req->input(), [
            "email" => "bail|required|email|exists:applications,email",
            "code" => "bail|required|in:1,2|numeric"
        ]);
        if ($validate->fails()) {
            return response()->json(['code' => 0, "message" => $validate->errors()]);
        }

        $applicat = \App\application::findorFail($req->email);
        $applicat->status = $req->code;
        $response = $applicat->save();
        if ($response) {
            $details =  $applicat->register;
            if ($req->code == 1) {
                //  return response()->json(['code'=>0,"message"=>$details]);

                return   $this->createUser($details, 0);
            } else {
                $resp =  $details->delete();
                if ($resp) {
                    try {
                        Mail::to($details->email)->send(new rejection($details->first_name));
                    } catch (\Exception $e) {
                        return   response()->json(['code' => 0, "message" => Mail::failures()], 215);
                    }
                    return response()->json(['code' => 1, "message" => "User Rejected"]);
                } else {
                    return response()->json(['code' => 0, "message" => "Someting went wrong"]);
                }
            }
        }

        // $applicat->status = $req->code;
        // $applicat->save();

        return response()->json(['code' => 0, 'message' => "hi"]);
    }

    function info(Request $req)
    {

        $val =   FacadesValidator::make(['email' => $req->id], ['email' => "bail|email|required|exists:users,email"]);

        if ($val->fails()) {
            return response()->json(['code' => 0, 'message' => $val->errors()]);
        }

        $resp =  user::where('email', $req->id)->get()->first();
        $user_info = collect($resp)->except(['id', 'role_id']);
        return response()->json(['code' => 1, 'message' => $user_info]);
    }

    function revoke(Request $req)
    {

        $validate = FacadesValidator::make($req->input(), ['email' => "bail|required|email|exists:users,email|exists:logins,users_email", "code" => "bail|required|numeric|in:0,1"]);
        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }

        $user = login::where('users_email', '=', $req->email)->get()->first();
        $user->status = $req->code;

        $mes = ($req->code == 1) ? "Access Restored" : "Access Revoked";
        if ($user->save()) {
            return response()->json(['code' => 1, 'message' => $mes]);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }


    function updateRole(Request $req)
    {
        // var_dump($req->input());
        $validate = FacadesValidator::make($req->input(), ['email' => "bail|required|email|exists:users,email|exists:logins,users_email", "role_id" => "bail|required|numeric|exists:role,id"]);
        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }

        $update = user::where('email', $req->email)->get()->first()->update(['role_id' => $req->role_id]);

        if ($update) {
            return response()->json(['code' => 1, 'message' => "Role Changed"]);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }
    function getstatus(Request $req)
    {

        $validate = FacadesValidator::make(['email' => $req->email], ['email' => "bail|required|email|exists:users,email|exists:logins,users_email"]);
        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()], 210);
        }

        $update = login::select('status')->where('users_email', '=', $req->email)->get()->first();



        return response()->json(['code' => 1, 'message' => $update->status]);
    }

    function password(Request $req)
    {

        $v =  FacadesValidator::make(
            $req->all(),
            [
                'oldpassword' => 'bail|required',
                'newpassword' => 'bail|required|min:8'
            ]
        );
        if ($v->fails()) {
            return response()->json(['code' => 0, 'message' => $v->errors()]);
        }

        $user = Auth::user();

        if (Hash::check($req->oldpassword, $user->password)) {
            $user->password = Hash::make($req->newpassword);
            if ($user->save()) {
                return response()->json(['code' => 1, 'message' => 'Password Changed']);
            } else {
                return response()->json(['code' => 0, 'message' => 'Something went wrong']);
            }
        } else {
            return response()->json(['code' => 0, 'message' => 'Wrong Password']);
        }
    }


    function photo(Request $re)
    {


        if ($re->hasFile('photoimage')) {
            $r = $re->photoimage->store('photos', ['disk' => 'public']);

            $photo = Storage::url($r);

            $user = Auth::user()->user;
            $user->photo = $photo;
            if ($user->save()) {
                return response()->json(['code' => 1, 'message' =>'success' , 'payload'=>$user]);
            }
            return response()->json(['code' => 0, 'message' => 'Something  went wrong']);
        }
    }

    function update(Request $re){

        $user = Auth::user()->user;

        $user->state_of_origin = $re->state_of_origin;
        $user->state_of_residence = $re->state_of_residence;
        
        $user->phone_number = $re->phone_number;
        $user->address = $re->address;

        $user->first_name = $re->first_name;
        $user->other_name = $re->other_name;
        $user->last_name = $re->last_name;
        if ($user->save()) {
            return response()->json(['code' => 1, 'message' =>'success' , 'payload'=>$user]);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    
    }
}
