<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Register extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('register',function(Blueprint $table){
        $table->id();
        $table->string('first_name');
        $table->string('other_name');
        $table->string('last_name');
        $table->string('email',100)->unique();
        $table->string('phone_number',11);
        $table->string('state_of_residence');
 
        $table->foreignId('role_id')->unsigned();
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    Schema::dropIfExists('register');
    }
}
