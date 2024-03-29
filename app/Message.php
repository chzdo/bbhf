<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['message','file_path','type'];

    public function user()
{
  return $this->belongsTo(users::class,"users_email",'email');
}
}
