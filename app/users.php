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

function messages($group){
  if (($this->role_id == 1 || $this->role_id == 4) && $group == 1)
        return $this->hasMany(VolunteerChat::class,'users_email','email');
  else if (($this->role_id == 2 || $this->role_id == 4) && $group == 2)
        return $this->hasMany(memberChat::class,'users_email','email');
  else if (($this->role_id == 3 || $this->role_id == 4) && $group == 3)
        return $this->hasMany(SponsorChat::class,'users_email','email');
  else if (( $this->role_id == 4) && $group == 4)
        return $this->hasMany(AdminChat::class,'users_email','email');
}


}
