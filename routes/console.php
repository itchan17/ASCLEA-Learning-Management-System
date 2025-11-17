<?php

use Illuminate\Support\Facades\Schedule;

Schedule::daily()
    ->group(function () {
        Schedule::command('app:permanently-delete-assessments');
        Schedule::command('app:permanently-delete-materials');
        Schedule::command('app:permanently-delete-sections');
        Schedule::command('app:permanently-delete-posts');
        Schedule::command('app:permanently-delete-archived-courses');
    });

Schedule::everyMinute()
    ->group(function () {
        Schedule::command('app:auto-submit-abandoned-quiz');
    });
