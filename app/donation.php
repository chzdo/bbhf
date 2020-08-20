<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class donation extends Model
{
    //
    public $timestamps = false;
    protected $table = "donation";
    protected $guarded = [];
    function toCategory(){
        return $this->hasMany('App\category','category');
    }
    function toProjects(){
        return $this->hasMany('App\projects','project');
    }

 
}
