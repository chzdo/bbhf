<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    //
    protected $table = 'users';

    protected $guarded = [];
  function isAdmin(){
      return $this->role_id == 21 ;
  }
  function validRole(){
  
    $role = \App\Role::find($this->role_id);
    return $role != null;
}
}
