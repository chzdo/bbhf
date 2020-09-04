<?php

use Illuminate\Database\Seeder;

class spon extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\SponsorChat::class, 1000)->create();
    }
}
