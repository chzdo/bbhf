<?php

namespace App\Http\Controllers;

use App\news as gist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class news extends Controller
{



    function create(Request $re)
    {
        $user = Auth::user()->user;
        $validate = Validator::make(
            $re->all(),
            [
                'title' => 'bail|required|max:50',
                'news' => 'required',
                'image_1' => 'bail|required|image',
                'category' => 'bail|required|exists:category,id'

            ]
        );


        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }
        $p =    $re->file('image_1')->store('news', ['disk' => 'public']);
        $image_1 = Storage::url($p);

        if ($re->hasFile('image_2')) {
            $pp =   $re->file('image_2')->store('news', ['disk' => 'public']);
            $image_2 = Storage::url($pp);
        }


        $value =      $re->all();
        unset($value['image_1']);
        unset($value['image_2']);
        $value['image_1'] =  $image_1;
        if ($re->hasFile('image_2')) {
            $value['image_2'] =  $image_2;
        }
        $project =   $user->news()->create($value);
        if ($project->exists()) {
            return response()->json(['code' => 1, 'message' => 'News Created']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }


    function update(Request $re)
    {
        $validate = Validator::make(
            $re->all(),
            [
                'id' => 'bail|required|exists:news,id',
                'title' => 'bail|required|max:50',
                'category' => 'bail|required|exists:category,id',
                'news' => 'required',
                'image_1' => 'bail|required',

            ]
        );


        if ($validate->fails()) {
            return response()->json(['code' => 0, 'message' => $validate->errors()]);
        }
        if ($re->hasFile('image_1')) {
            $p =  $re->file('image_1')->store('news', ['disk' => 'public']);
            $image_1 = Storage::url($p);
        }

        if ($re->hasFile('image_2')) {
            $pp =   $re->file('image_2')->store('news', ['disk' => 'public']);
            $image_2 = Storage::url($pp);
        }


        $value =      $re->all();

        $value['image_1'] = isset($image_1) ? $image_1 : $value['image_1'];
        $value['image_2'] =  isset($image_2) ? $image_2 : $value['image_2'];
        $news =   gist::where('id',$value['id'])->first();
        $news->news = $value['news'];
        $news->category = $value['category'];
        $news->image_1 = $value['image_1'];
        $news->image_2 = $value['image_2'];
        $news->status = 0;
        if ($news->save()) {
            return response()->json(['code' => 1, 'message' => 'News Updated']);
        }
        return response()->json(['code' => 0, 'message' => 'Something went wrong']);
    }
    function list()
    {
        $new =  gist::where('status', 1)->get();
        return response()->json(['code' => 1, 'message' => $new]);
    }
    function other()
    {
        $new =  gist::where('status', 2)->get();
        return response()->json(['code' => 1, 'message' => $new]);
    }

    function new()
    {
        $new =  gist::where('status', 0)->orderByDESC('id')->get();
        return response()->json(['code' => 1, 'message' => $new]);
    }

    function news($id)
    {
        $validate = Validator::make(['id'=>$id],['id'=>'bail|required|numeric|exists:news,id']);

        if($validate->fails()){
          return response()->json(['code'=>2, 'message'=>'Not found']);
        }
        $new = gist::where('id',$id)->firstorFail();
        return response()->json(['code' => 1, 'message' => $new]);
    }
    function approve($id, $status)
    {

        if (!in_array($status, [1, 2])) {
            return  response()->json(['code' => 0, 'message' => "Invalid Request"]);
        }
        $new = gist::where('id',$id)->first();
        $new->status = $status;
        if ($new->save()) {
            return response()->json(['code' => 1, 'message' => "Approval Status Updated"]);
        }
        return  response()->json(['code' => 0, 'message' => "Something went wrong"]);
    }


    function index(){
      
            //    var_dump($req->param);
            $latest  = gist::where('status',1)->with('category:id,category')->with('author:email,first_name,last_name')->orderByDESC('id')->first();
            $more = gist::where('status',1)->with('category:id,category')->with('author:email,first_name,last_name')->orderByDESC('id')->paginate(5);
            $opp = \App\opportunity::where('status',1)->get()->take(3);
   //   $latest =    $latest->count() == 0? [] : $latest->toArray();
    //  $more =    $more->count() == 0? [] : $more->toArray();
   //   $opp =    $opp->count() == 0? [] : $opp->toArray();
                return view('pages.news', compact('latest','more', 'opp'));
     
    }
    

    function full($id){
      
        //    var_dump($req->param);
        $news = gist::where('id',$id)->where('status',1)->with('category:id,category')->with('author:email,first_name,last_name')->orderByDESC('id')->firstorFail();
        $more = gist::where('status',1)->with('category:id,category')->with('author:email,first_name,last_name')->orderByDESC('id')->get()->take(10);
        $news =    $news->count() == 0? [] : $news->toArray();
        $more =    $more->count() == 0? [] : $more->toArray();
            return view('pages.full', compact('news','more'));
 
}
}
