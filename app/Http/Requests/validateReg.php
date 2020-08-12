<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class validateReg extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "first_name"=>'bail|required',
            "other_name"=>'bail|required',
            "other_name"=>'bail|required',
            "email"=>"bail|required|email|unique:register",
            "phone_number"=>"bail|max:11|min:11",
            "state_of_residence"=>"bail|required",
            "role_id"=>"bail|required|numeric"
        ];
    }
}
