<?php

use Illuminate\Database\Seeder;

class mem extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\memberChat::class, 1000)->create();
    }
}
