<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class application extends Model
{
protected $guarded = [];
protected $primaryKey = 'email';
protected $keyType = 'string';


    function register(){
     return   $this->belongsTo('App\register','email','email');
    }
}
