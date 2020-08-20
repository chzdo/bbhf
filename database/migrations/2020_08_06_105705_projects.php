<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Projects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function(BluePrint $table){
            $table->increments('id');
            $table->string('project');
            $table->integer('category')->unsigned();
            $table->timestamp('date')->useCurrent();
            $table->foreign('category')->references('id')->on('category');
            $table->string('amount');
            $table->integer('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('projects');
    }
}
