<?php

namespace App\Http\Requests;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
class donorValid extends FormRequest
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
       throw new HttpResponseException(response()->json(["code"=>0,"message"=>$validator->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
     
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"=>"bail|required",
            "email"=>"bail|required|email",
            "donation_reference"=>"bail|required|unique:donation",
             "donation_category"=>"bail|required|numeric",
             "donation_project"=>"bail|required|numeric",
             "donation_amount"=>"bail|numeric|required"
            


        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required!',
            'name.required' => 'Name is required!',
            'password.required' => 'Password is required!'
        ];
    }
}
