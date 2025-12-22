<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Show the checkout page with cart items and total.
     */
    public function index()
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()
                ->route('buyers.cart')
                ->with('error', 'Your cart is empty.');
        }

        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

        return Inertia::render('Buyer/Checkout', [
            'cartItems' => $cartItems,
            'total'     => $total,
        ]);
    }
}