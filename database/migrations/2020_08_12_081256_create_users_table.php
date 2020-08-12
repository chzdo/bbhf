<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('other_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone_number',11);
            $table->string('state_of_residence');
       
            $table->string('state_of_origin')->nullable();
            $table->string('address')->nullable();
            $table->string('photo')->nullable();
            $table->string('user_number',5)->unique();
            $table->timestamps();
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
        Schema::dropIfExists('users');
    }
}
