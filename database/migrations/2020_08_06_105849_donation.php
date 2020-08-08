<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Donation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donation', function(Blueprint $table){
            $table->increments('id');
            $table->string('name',30);
            $table->string('email',100)->index();
            $table->dateTime('date_donated');
            $table->string('donation_reference',20);
            $table->integer('donation_status');
            $table->integer('donation_category')->unsigned();
             $table->integer('donation_project')->unsigned();
             $table->foreign('donation_category')->references('id')->on('category');
             $table->foreign('donation_project')->references('id')->on('projects');
           }   );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('donation');
    }
}
