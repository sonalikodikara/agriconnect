<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AdvisorController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\CartController;
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

    Route::middleware('auth')->group(function () {
        Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
        Route::post('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
        Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
        Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
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

        // Product routes (nested under supplier)
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    });
/*
    // Buyer routes
    Route::prefix('buyer')->name('buyers.')->middleware('auth')->group(function () {
        Route::get('/profile', [BuyerController::class, 'profile'])->name('profile.show');
    });
    */

    Route::prefix('buyer')->name('buyers.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [BuyerController::class, 'dashboard'])->name('dashboard');
    Route::get('/cart', [BuyerController::class, 'cart'])->name('cart');
    Route::get('/checkout', [BuyerController::class, 'checkout'])->name('checkout');
    Route::post('/delivery-details', [BuyerController::class, 'saveDelivery'])->name('delivery.save');
    Route::get('/orders', [BuyerController::class, 'orders'])->name('orders');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
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

    // Add inside your public routes (no auth needed for browsing)
    Route::prefix('list')->name('list.')->group(function () {
        Route::get('/seeds', [ProductListController::class, 'seeds'])->name('seeds');
        Route::get('/fertilizer', [ProductListController::class, 'fertilizer'])->name('fertilizer');
        Route::get('/equipment', [ProductListController::class, 'equipment'])->name('equipment');
        Route::get('/vehicles', [ProductListController::class, 'vehicles'])->name('vehicles');
        Route::get('/advisors', [ProductListController::class, 'advisors'])->name('advisors');
        Route::get('/pesticides', [ProductListController::class, 'pesticides'])->name('pesticides');
        Route::get('/others', [ProductListController::class, 'others'])->name('others');
    });
    Route::get('/advisor/{advisor}', [AdvisorController::class, 'show'])->name('advisor.show');

require __DIR__.'/auth.php';
