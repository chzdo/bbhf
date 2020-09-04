<?php

namespace App\Http\Controllers;

use App\Message;
use App\AdminChat;
use App\MemberChat;
use App\SponsorChat;
use App\VolunteerChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Broadcast;
use App\Events\MemberChat as EventsMemberChat;
use App\Events\websock;

class chat extends Controller
{


  public function __construct()
  {
    $this->middleware('auth');
  }

  /**
   * Show chats
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return view('chat');
  }

  /**
   * Fetch all messages
   *
   * @return Message
   */
  public function fetchMessages(Request $req)
  {
  $role = Auth::user()->user->role_id;
 $r= null;
try{
    if ( $req->group == 1 && ( $role == 1 || $role = 4)){
   // $r = VolunteerChat::with('user')->orderByDesc('id')->paginate(15);
    }else if ($req->group == 2 && ( $role == 2 || $role = 4)){
     $r = MemberChat::all();//orderByDesc('id')->paginate(15);
    }else if ($req->group == 3 && ( $role == 3 || $role = 4)){
    //  $r = SponsorChat::with('user')->orderByDesc('id')->paginate(15);
    }else if ($req->group == 4 && (  $role = 4)){
    //  $r = AdminChat::with('user')->orderByDesc('id')->paginate(15);
    }else{
    //  return  response()->json(['code' => 0, 'message' => 'invalid access']);
    }
    return  response()->json(['code' => 1, 'message' => $r]);
  }catch(\Exception $e){
    return $e;
  }
  }

  /**
   * Persist message to database
   *
   * @param  Request $request
   * @return Response
   */
  public function sendMessage(Request $request)
  {
    $user = Auth::user()->user;
       $pl = null;
  

    if ($request->hasFile('file')) {
      if ($request->file('file')->getSize() > 50000) {
        return response()->json(['code' => 0, 'message' => 'file too big']);
      }
      $p =    $request->file('file')->store('files',['disk'=>'public']);
     $pl = Storage::url($p);
      }
  $message = $request->type == 0 ? $request->message : $request->file->getClientOriginalName();

    $messag = $user->messages($request->group)->create([
      'message' =>$message ,
      'file_path'=>$pl,
      'type'=>$request->type
    ]);
    Broadcast(new EventsMemberChat($messag->load('user'),$request->group))->toOthers();

    if ($messag->exists()) {
      return response()->json(['code' => 1, 'message' => $request->code, 'payload'=>$pl]);
    } else {
      return response()->json(['code' => 0, 'message' => $request->code]);
    }
  }

  function friends(Request $req){
if ($req->filled('group')){
    $friends = \App\users::where('role_id',$req->group)->orWhere('role_id',4)->get();
    return response()->json(['code' => 1, 'message' =>$friends, 'payload'=>null]);
}else{
  return response()->json(['code' => 0, 'message' =>'invalid request', 'payload'=>null]);
}
}
}
