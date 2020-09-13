<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class projects extends Model
{
    protected $table = 'projects';
    protected $fillable = ['project', 'description', 'amount', 'image','category'];
    public  $timestamps = false;


    public function donations(){
      return  $this->hasMany(donation::class,'donation_project','id');
    }
}
