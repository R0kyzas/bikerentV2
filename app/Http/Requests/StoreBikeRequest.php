<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBikeRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|between:3,37',
            'idn' => 'required|min:12|max:12',
            'description' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'city_id' => 'required',
            'active' => 'nullable',
            'in_stock' => 'required',
        ];
    }
}
