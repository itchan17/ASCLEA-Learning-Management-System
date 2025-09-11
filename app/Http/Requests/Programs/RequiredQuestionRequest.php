<?php

namespace App\Http\Requests\Programs;

use App\Models\Programs\Question;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
        return [
            'answers' => 'required|array',
            'answers.*.answer_id' => [
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $questionId = $this->input("answers.$index.question_id");

                    $question = Question::find($questionId);

                    if ($question && $question->is_required && !$value && in_array($question->question_type, ['multiple_choice', 'true_or_false'])) {
                        $fail("This question is required.");
                    }
                }
            ],
            'answers.*.answer_text' => [
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $questionId = $this->input("answers.$index.question_id");

                    $question = Question::find($questionId);

                    if ($question && $question->is_required && !$value && $question->question_type === "identification") {
                        $fail("This question is required.");
                    }
                }
            ],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $formatted = [];

        foreach ($errors as $key => $messages) {
            if (preg_match('/answers\.(\d+)\./', $key, $matches)) {
                $index = (int) $matches[1];
                $questionId = $this->input("answers.$index.question_id");
                $formatted[$questionId ?? $index] = $messages;
            }
        }

        throw new HttpResponseException(
            response()->json([
                'message' => 'Required questions was not completed.',
                'errors'  => $formatted,
            ], 422)
        );
    }
}
