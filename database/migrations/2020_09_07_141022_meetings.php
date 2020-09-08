<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Meetings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meetings',function(Blueprint $table){
            $table->increments('id');
            $table->bigInteger('meeting_id')->unique();
            $table->string('topic');
            $table->string('timezone');
            $table->string('password');
            $table->integer('group');
            $table->integer('duration');
            $table->dateTimeTz('start_time');
            $table->timestamps();

         
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meetings');
    }
}
