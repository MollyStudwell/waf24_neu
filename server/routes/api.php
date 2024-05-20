<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotelistController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/auth/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['api', 'auth.jwt','auth.admin']], function () {
    Route::get('/notelists', [NotelistController::class, 'index']);
    Route::get('/notelists/{id}', [NotelistController::class, 'findByID']);
    Route::post('/notelists', [NotelistController::class, 'save']);
    Route::put('/notelists/{id}', [NotelistController::class, 'update']);
    Route::delete('/notelists/{id}', [NotelistController::class, 'delete']);

    Route::get('/notes', [NoteController::class, 'index']);
    Route::get('/notes/{id}', [NoteController::class, 'findByID']);
    Route::get('/notes/search/{searchTerm}', [NoteController::class, 'findBySearchTerm']);
    Route::post('/notes', [NoteController::class, 'save']);
    Route::put('/notes/{id}', [NoteController::class, 'update']);
    Route::delete('/notes/{id}', [NoteController::class, 'delete']);

    Route::get('/todos', [TodoController::class, 'index']);
    Route::get('/todos/{id}', [TodoController::class, 'findByID']);
    Route::post('/todos', [TodoController::class, 'save']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', [TodoController::class, 'delete']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'findByID']);
    Route::post('/categories', [CategoryController::class, 'save']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);

    Route::get('/user/search/{searchTerm}', [UserController::class, 'findEmailBySearchTerm']);
    Route::get('/user', [UserController::class, 'index']);

    /* auth */
    Route::post('auth/logout', [AuthController::class, 'logout']);
});

