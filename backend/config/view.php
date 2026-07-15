<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. This file defines the
    | paths where Laravel will look for view files. We define a single path
    | that points to our (currently empty) views directory.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | When views are cached, the compiled version is stored here. This directory
    | must exist so that Blade compilation can proceed (we use the standard
    | Laravel cache location).
    |
    */

    'compiled' => storage_path('framework/views'),

];