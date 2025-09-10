<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
use App\Models\Programs\Quiz;

class QuestionService
{
    public function createInitialQuestion(string $quizId, array $otherDetails)
    {
        $questionCount = Question::where('quiz_id', $quizId)->count();

        $questiondetails =  [
            'quiz_id' => $quizId,
            'question' => "Question",
            'question_type' => $otherDetails['question_type'],
            'question_points' => 0,
            'sort_order' => $questionCount + 1,
            'is_required' => false,
        ];

        return Question::create($questiondetails)->only(['quiz_id', 'question_id']);
    }

    public function updateQuestionDetails(Question $question, array $validatedQuestionDetails)
    {
        $question->update($validatedQuestionDetails);
    }

    public function deleteQuestions(Question $question)
    {
        $question->delete();
    }

    public function reorderQuestion(Question $question, array $data, string $quizId)
    {
        // Updates the sort order of the dragged question
        $question->update(['sort_order' => $data['newSortOrder']]);

        // Reorder logic:
        // - If the question is moved DOWN (newSortOrder > origSortOrder):
        //   We have to decrement all the questions between the original pos and new pos of the question
        // - If the question is moved UP (newSortOrder < origSortOrder):
        //   We have to increment all the questions between the original pos and new pos of the question

        if ($data['newSortOrder'] > $data['origSortOrder']) {
            Question::where('question_id', "!=", $question->question_id)
                ->where('quiz_id', $quizId)
                ->where('sort_order', "<=", $data['newSortOrder'])
                ->where('sort_order', '>', $data['origSortOrder'])
                ->decrement('sort_order');
        } else {
            Question::where('question_id', "!=", $question->question_id)
                ->where('quiz_id', $quizId)
                ->where('sort_order', ">=", $data['newSortOrder'])
                ->where('sort_order', '<', $data['origSortOrder'])
                ->increment('sort_order');
        }
    }

    public function getQuestions(Quiz $quiz, string $assessmentSubmisisonId)
    {
        // Return the list of question along with its options
        return $quiz->questions()
            ->with([
                'options' => function ($query) {
                    $query->select(['question_option_id', 'question_id', 'option_text'])
                        ->orderBy("option_order");
                }
            ])
            ->with([
                'studentAnswers' => function ($query) use ($assessmentSubmisisonId) {
                    $query->where('assessment_submission_id', $assessmentSubmisisonId);
                }
            ])
            ->orderBy("sort_order")
            ->paginate(10, ['*'], 'page')
            ->withQueryString();
    }
}
