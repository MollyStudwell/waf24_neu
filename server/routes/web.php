<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where     you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/*Route::get('/', function(){
    return view('welcome');
});*/

Route::get('/', [\App\Http\Controllers\NotelistController::class,"index"]);
Route::get('notes', [\App\Http\Controllers\NoteController::class,"index"]);
Route::get('todos', [\App\Http\Controllers\TodoController::class,"index"]);
Route::get('categories', [\App\Http\Controllers\CategoryController::class,"index"]);
Route::get('user', [\App\Http\Controllers\UserController::class,"index"]);
