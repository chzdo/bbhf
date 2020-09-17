<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class news extends Model
{
    protected $fillable = ['title','news','image_1','image_2','status', 'category'];


  public  function author(){
        return $this->hasMany('App\users','email','author');
    }
   public function category(){
        return  $this->hasMany(category::class,'id','category');
    }
    public function donations(){
      
      }
}
