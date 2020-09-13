<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class projects extends Controller
{
    
    function __construct()
    {
        
    }

    function createProject(Request $re){


        $validate =  Validator::make($re->all(),[
            'project' => 'bail|required|max:50',
            'description' => 'bail|required|max:150',
            'amount'=>'bail|required|numeric',
        'image'=> 'bail|required|image'
            
            
            
            ]);

            if($validate->fails()){
                return response()->json(['code'=>0, 'message'=>$validate->errors()]);
            }
            $p =    $re->file('image')->store('projects',['disk'=>'public']);
            $pl = Storage::url($p);

            
         $value =      $re->all();
         unset($value['image']);
         $value['image'] =  $pl;
       
         $project =   \App\projects::updateOrCreate([
             'project'=> $value['project']
         ],$value);
         if($project->exists()){
            return response()->json(['code'=>1, 'message'=>'Project Created']);
         }
         return response()->json(['code'=>0, 'message'=>'Something went wrong']);
    }


  function list(){

 $list =   DB::table('projects')->select('projects.id')->leftJoin('donation','donation.donation_project','=','projects.id')

 ->selectRaw('sum(donation.donation_amount) as amount_raised, projects.*') ->groupBy('projects.id')->get();
 if ($list){
    return response()->json(['code'=>1 , 'message'=>$list]);
 }
 return response()->json(['code'=>0 , 'message'=>'Something went wrong']);
  }



  function project(Request $r,$id){

     

      $validate = Validator::make(['id'=>$id],['id'=>'bail|required|numeric|exists:projects,id']);

      if($validate->fails()){
        return response()->json(['code'=>2, 'message'=>'Not found']);
      }
     
      $project =     \App\projects::where('id',$id)->with('donations')->first();
     
          return response()->json(['code'=>1, 'message'=>$project]);
   
  }

  function active(Request $re){
    $validate = Validator::make(['id'=>$re->id, 'status'=>$re->status ],['id'=>'bail|required|numeric|exists:projects,id','status'=>'bail|numeric|required']);

    if($validate->fails()){
      return response()->json(['code'=>0, 'message'=>'Something went wrong']);
    }
   
    $project =     \App\projects::where('id',$re->id)->first();
    $project->status = $re->status;
   if($project->save())
        return response()->json(['code'=>1, 'message'=>"Status Updated"]);
    else
        return response()->json(['code'=>0, 'message'=>"something went wrong"]);
  }



  function donation(){

    $donation = \App\donation::with(['projects:id,project','category:id,category'])->orderByDesc('date_donated')->get();
    return response()->json(['code'=>1 , 'message'=>$donation]);
  }
}


/**
->leftJoin('tasks', 'tasks.job_id', '=', 'jobs.id')
->groupBy('jobs.id')
->selectRaw('sum(tasks.total_time) as total_time, jobs.id')
->lists('total_time', 'id');
**/