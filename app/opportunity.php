<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class opportunity extends Model
{
    protected $fillable = ['title','publication', 'image', 'status', 'type'];


    function application(){
        return $this->hasMany(gApply::class,'grant','id');
    }
}
