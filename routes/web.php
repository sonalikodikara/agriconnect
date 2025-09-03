<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AdvisorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

    // Profile routes
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    
    // Supplier routes
    Route::prefix('supplier')->name('suppliers.')->group(function () {
        // Fixed route first
        Route::get('/profile', [SupplierController::class, 'profile'])->name('profile.show');
        Route::get('/{supplier}/edit', [SupplierController::class, 'edit'])->name('edit');
        Route::put('/{supplier}', [SupplierController::class, 'update'])->name('update');
        // Other routes
        Route::get('/', [SupplierController::class, 'index'])->name('index');
        Route::get('/create', [SupplierController::class, 'create'])->name('create');
        Route::post('/', [SupplierController::class, 'store'])->name('store');
        Route::get('/{supplier}', [SupplierController::class, 'show'])->name('show');
        Route::delete('/{supplier}', [SupplierController::class, 'destroy'])->name('destroy');
    });

    // Buyer routes
    Route::prefix('buyer')->name('buyers.')->middleware('auth')->group(function () {
        Route::get('/profile', [BuyerController::class, 'profile'])->name('profile.show');
    });

    // Advisor routes
    Route::prefix('advisor')->name('advisors.')->middleware('auth')->group(function () {
        Route::get('/profile', [AdvisorController::class, 'profile'])->name('profile.show');
        Route::get('/create', [AdvisorController::class, 'index'])->name('create');
        Route::post('/', [AdvisorController::class, 'store'])->name('store');
    });

    // Admin routes
    Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    });


require __DIR__.'/auth.php';
