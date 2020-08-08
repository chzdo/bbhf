<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class category extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


      DB::table('category')->insert([
            array(
            'category'=>"Community Development Projects"
            ),
            array(
                'category'=>"Entreprenuership and Empowerment Grants"
                ),
                array(
                    'category'=>"Medical Mission Outreach"
                    ),
                    array(
                        'category'=>"Evangelical Outreaches"
                        ),
                        array(
                            'category'=>"Social Schemes"
                            ),
                            array(
                                'category'=>"Volunteering Programme"
                                ),
      ]
          )
      ;
    }
}
