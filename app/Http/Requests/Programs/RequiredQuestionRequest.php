<?php

namespace App\Http\Requests\Programs;

use App\Models\Programs\Question;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class RequiredQuestionRequest extends FormRequest
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

        // Only validate the field if its null or isTimerEnded is false
        if (!$this->boolean('isTimerEnded')) {
            return [
                'answers.*.student_answer' => 'required_unless:isTimerEnded,null,false|required_if:answers.*.is_required,true'
            ];
        }

        return [];
    }

    public function messages(): array
    {
        // Require student_answer if the question is required
        return [
            'answers.*.student_answer.required_if' => 'This question is required.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $formatted = [];

        // Errors need to be formatted with question_id as key name, to be easily display to question in frontend
        foreach ($errors as $key => $messages) {
            if (preg_match('/answers\.(\d+)\./', $key, $matches)) {
                $index = (int) $matches[1];
                $questionId = $this->input("answers.$index.question_id");
                $formatted[$questionId ?? $index] = $messages;
            }
        }

        $response = back()->withErrors($formatted)->withInput();

        throw new ValidationException($validator, $response);

        // throw new HttpResponseException(
        //     response()->json([
        //         'message' => 'Required questions was not completed.',
        //         'errors'  => $formatted,
        //     ], 422)
        // );
    }
}
