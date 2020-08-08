<?php

use Illuminate\Database\Seeder;

class projects extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\projects::insert([
            "project"=>"School for Borno",
            "category"=>1,
            "amount"=>"300000"

        ]);
    }
}
