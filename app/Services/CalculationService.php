<?php

namespace App\Services;

class CalculationService
{
    public function calculatePercentage(int $score, int $totalScore)
    {
        return $totalScore > 0 ? intval(round(($score / $totalScore) * 100, 0)) : 0;
    }

    // Method for getting the hours and minutes based on the minutes provided
    public function calculateHoursAndMins(int $mins)
    {
        if ($mins === 0) {
            return 0;
        }

        $hours = intdiv($mins, 60);
        $minutes = $mins % 60;

        return [
            "hours" =>  $hours,
            "minutes" => $minutes
        ];
    }
}
