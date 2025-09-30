<?php

namespace App\Http\Requests\Programs;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        switch ($this->method()) {

            case 'POST':

                return [
                    'question_type' => 'required|string|in:multiple_choice,true_or_false,identification',
                ];

            case 'PUT':

                return [
                    'question' => 'required|string',
                    'question_type' => 'required|string|in:multiple_choice,true_or_false,identification',
                    'question_points' => 'integer|min:0|max:999',
                    'is_required' => 'required|boolean',
                ];

            default:
                return [];
                break;
        };
    }
}
