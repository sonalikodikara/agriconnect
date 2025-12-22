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
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
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

// Dashboard/Home routes
Route::get('/home', function () {
    return Inertia::render('Home', [
        'user' => auth()->user(),
    ]);
})->middleware(['auth', 'verified'])->name('home');

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
    Route::get('/profile', [SupplierController::class, 'profile'])->name('profile.show');
    Route::get('/{supplier}/edit', [SupplierController::class, 'edit'])->name('edit');
    Route::put('/{supplier}', [SupplierController::class, 'update'])->name('update');
    Route::get('/', [SupplierController::class, 'index'])->name('index');
    Route::get('/create', [SupplierController::class, 'create'])->name('create');
    Route::post('/', [SupplierController::class, 'store'])->name('store');
    Route::get('/{supplier}', [SupplierController::class, 'show'])->name('show');
    Route::delete('/{supplier}', [SupplierController::class, 'destroy'])->name('destroy');

    // Product routes (nested under supplier)
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
});

// Buyer routes (including prefixed cart routes)
Route::prefix('buyer')->name('buyers.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [BuyerController::class, 'dashboard'])->name('dashboard');
    Route::post('/delivery-details', [BuyerController::class, 'saveDelivery'])->name('delivery.save');
    Route::get('/orders', [BuyerController::class, 'orders'])->name('orders');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Cart routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');

    // Checkout route - FIXED: point to 'index' method
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');

    // Orders routes (note: you had duplicate '/orders' GET)
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

});

// Advisor routes
Route::prefix('advisor')->name('advisors.')->middleware('auth')->group(function () {
    Route::get('/profile', [AdvisorController::class, 'profile'])->name('profile.show');
    Route::get('/create', [AdvisorController::class, 'index'])->name('create');
    Route::post('/', [AdvisorController::class, 'store'])->name('store');

    // New routes for specialties and certificates
    Route::get('/specialties', [AdvisorController::class, 'specialties'])->name('specialties.edit');
    Route::post('/specialties', [AdvisorController::class, 'updateSpecialties'])->name('specialties.update');

    Route::get('/certifications', [AdvisorController::class, 'certifications'])->name('certifications.edit');
    Route::post('/certifications', [AdvisorController::class, 'updateCertifications'])->name('certifications.update');
});

// Admin routes
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
});

// Product listing routes
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