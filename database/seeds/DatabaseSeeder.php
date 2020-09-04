<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([spon::class,voul::class,adm::class,mem::class]);
       // $this->call(projects::class);
    }
}
