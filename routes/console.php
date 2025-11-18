<?php

use Illuminate\Support\Facades\Schedule;

Schedule::daily()
    ->group(function () {
        Schedule::command('app:permanently-delete-assessments');
        Schedule::command('app:delete-old-rejected-students'); 
    });

Schedule::everyMinute()
    ->group(function () {
        Schedule::command('app:auto-submit-abandoned-quiz');
    });
