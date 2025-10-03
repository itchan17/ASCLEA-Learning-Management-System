<?php

namespace App\Services\Programs;

use Exception;
use Illuminate\Support\Facades\Http;

class AIFeedbackService
{
    public static function getFeedback(array $userContent, string $systemContent, string $model): ?string
    {
        try {
            // Makes request to the api
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('GPT_API_KEY'),
            ])->post("https://api.openai.com/v1/chat/completions", [
                "model" => $model,
                "messages" => [
                    [
                        "role" => "system",
                        "content" => $systemContent
                    ],
                    [
                        "role" => "user",
                        "content" => json_encode($userContent, JSON_UNESCAPED_UNICODE)
                    ]
                ]
            ]);

            $rawData = $response->json('choices.0.message.content');

            if ($response->failed()) {

                throw new Exception("Request failed");
            }

            if (!$rawData) {
                throw new Exception("No content returned from model.");
            }

            $decoded = json_decode($rawData, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("Invalid JSON format");
            }

            // Return the raw data which is a json string
            // since it the type of data accepted in the database
            return $rawData;
        } catch (Exception $e) {
            throw $e;
            return null;
        }
    }
}
