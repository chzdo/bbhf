<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class role extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    DB::table('role')->truncate();
       DB::table('role')->insert([
           ["role"=>"Volunteer"],
           ['role'=>'Member'],
           ['role'=>'Sponsor']
       ]);
    }
}
