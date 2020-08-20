<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class login extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('logins')->insert([
            "users_email"=>"c@gj.ll",
            "password" => Hash::make('password'),
            "status"=>0
        ]);
    }
}
