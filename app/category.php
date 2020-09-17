<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    //
    protected $table = 'category';

     function projects(){
        return $this->hasMany('App\projects','category','id');
    }
    function news(){
        return $this->hasMany(news::class,'category','id');
  }
}
