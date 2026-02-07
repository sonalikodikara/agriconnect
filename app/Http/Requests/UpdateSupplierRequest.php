<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'business_name' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'district' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'established' => 'nullable|string|max:50',
            'experience' => 'nullable|string|max:50',
            'specialization' => 'nullable',
            'certifications' => 'nullable',
            'profile_image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
            'cover_image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:4096',
        ];
    }
}
