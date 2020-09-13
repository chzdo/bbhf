<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class donation extends Model
{
    //
    public $timestamps = false;
    protected $table = "donation";
    protected $guarded = [];
    function category(){
        return $this->belongsTo('App\category','donation_category','id');
    }
    function projects(){
        return $this->belongsTo(projects::class,'donation_project','id');
    }

 
}
