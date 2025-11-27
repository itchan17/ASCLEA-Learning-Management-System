<?php

namespace App\Http\Requests\Programs;

use Illuminate\Foundation\Http\FormRequest;

class AddMaterialRequest extends FormRequest
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
            'material_title' => 'required|string|max:255',
            'material_description' => 'nullable|string',
            'status' => 'required|in:published,draft',
            'section_id' => 'nullable|string',

            // Files
            'material_files' => 'nullable|array|max:10',
            'material_files.*' => 'file|mimes:pdf,docx,pptx,png,jpg,jpeg|max:204800'
        ];
    }

    public function messages(): array
    {
        // Change the error message for max file uploads
        return [
            'material_files.max' => 'Maximum 10 files can be uploaded at once.',
        ];
    }

    public function attributes(): array
    {
        $attributes = [];

        // Change the atrribute to file name instead of index
        foreach ($this->file('material_files') ?? [] as $index => $file) {
            $attributes["material_files.$index"] = $file->getClientOriginalName();
        }

        return $attributes;
    }
}
