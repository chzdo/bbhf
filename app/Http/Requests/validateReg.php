<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\JsonResponse as HttpFoundationJsonResponse;

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
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json(["code"=>0,"message"=>$validator->errors()],210));
      
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
            "last_name"=>'bail|required',
            "email"=>"bail|required|email|unique:register|unique:users",
            "phone_number"=>"bail|unique:register|max:11|min:11|unique:users",
            "state_of_residence"=>"bail|required",
            "role_id"=>"bail|required|exists:role,id"
        ];
    }
    public function sanitize(){
        return [
            "first_name"=> "trim|uppercase",
            "other_name"=> "trim|uppercase",
            "last_name"=> "trim|uppercase",
            "email"=>"trim|lowercase",
        ];
    }
}
