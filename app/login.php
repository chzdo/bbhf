<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Laravel\Passport\HasApiTokens;

class login extends Authenticatable
{
    use Notifiable; //use HasApiTokens;

    public $timestamps = false;
    protected $hidden = ['password','remember_token'];
    protected $fillable = ['email','password'];


    function user(){
        return $this->belongsTo('App\users','users_email','email');

    }
    function isAdmin(){
        return $this->user() ;
    }
    
   
}
