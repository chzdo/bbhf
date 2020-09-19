<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGAppliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('g_applies', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('email');
            $table->string('phone_number');
            $table->integer('status')->default(0);
            $table->integer('grant');
            $table->string('file');
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
        Schema::dropIfExists('g_applies');
    }
}
