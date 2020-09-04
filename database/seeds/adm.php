<?php

use Illuminate\Database\Seeder;

class adm extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\AdminChat::class, 1000)->create();
    }
}
