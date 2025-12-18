<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display the buyer's cart with all items and product details.
     */
    public function index()
    {
        $cartItems = CartItem::with(['product.supplier'])
            ->where('user_id', Auth::id())
            ->get();

        // Calculate cart count for navbar (optional, but useful)
        $cartCount = $cartItems->count();

        return Inertia::render('Buyer/Cart', [
            'cartItems' => $cartItems,
            'cartCount' => $cartCount,
        ]);
    }

    /**
     * Add a product to the cart (or increase quantity if already exists).
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $userId = Auth::id();

        $cartItem = CartItem::firstOrCreate(
            [
                'user_id'    => $userId,
                'product_id' => $request->product_id,
            ],
            ['quantity' => 0]
        );

        $cartItem->quantity += $request->quantity;
        $cartItem->save();

        return redirect()->back()->with('status_key', 'added_to_cart');
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($id);

        // Security check: ensure the item belongs to the authenticated user
        if ($cartItem->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return redirect()->back()->with('status_key', 'cart_updated');
    }

    /**
     * Remove an item from the cart.
     */
    public function remove($id)
    {
        $cartItem = CartItem::findOrFail($id);

        // Security check
        if ($cartItem->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $cartItem->delete();

        return redirect()->back()->with('status_key', 'item_removed');
    }
}