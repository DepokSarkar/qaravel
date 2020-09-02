<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'user'], function ($router) {
    Route::post('login', 'Auth\UserController@login');
    Route::group(['middleware' => ['auth:user']], function () {
        Route::post('logout', 'Auth\UserController@logout');
        Route::post('refresh', 'Auth\UserController@refresh');
        Route::post('me', 'Auth\UserController@me');
    });
});

Route::group(['prefix' => 'staff'], function ($router) {
    Route::post('login', 'Auth\StaffController@login');
    Route::group(['middleware' => ['auth:staff']], function () {
        Route::post('logout', 'Auth\StaffController@logout');
        Route::post('refresh', 'Auth\StaffController@refresh');
        Route::post('me', 'Auth\StaffController@me');
    });
});

Route::group(['prefix' => 'admin'], function ($router) {
    Route::post('login', 'Auth\AdminController@login');
    Route::group(['middleware' => ['auth:admin']], function () {
        Route::post('logout', 'Auth\AdminController@logout');
        Route::post('refresh', 'Auth\AdminController@refresh');
        Route::post('me', 'Auth\AdminController@me');
    });
});