<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\JsonResponse as HttpFoundationJsonResponse;

class LoginRequest extends FormRequest
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


    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json(["code"=>0,"message"=>$validator->errors()],210));
      
     }


    public function rules()
    {
        return [
           "users_email"=>"bail|email|required|exists:logins,users_email",
           "password"=>"bail|required",
        
        ];
    }
}
