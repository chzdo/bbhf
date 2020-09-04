<?php

use Illuminate\Database\Seeder;

class voul extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\VolunteerChat::class, 1000)->create();
    }
}
