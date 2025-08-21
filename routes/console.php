<?php

use Illuminate\Support\Facades\Schedule;

Schedule::daily()
    ->group(function () {
        Schedule::command('app:permanently-delete-assessments');
    });
