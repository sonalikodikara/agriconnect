<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller {
    public function index() {
        $cartItems = CartItem::with('product')->where('user_id', auth()->id())->get();
        return Inertia::render('Buyer/Cart', ['cartItems' => $cartItems]);
    }

    public function add(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::firstOrNew([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        $item->quantity = ($item->quantity ?? 0) + $request->quantity;
        $item->save();

        return redirect()->back()->with('status_key', 'added_to_cart');
    }

    public function update(Request $request, $id) {
        $request->validate(['quantity' => 'required|integer|min:1']);

        $item = CartItem::findOrFail($id);
        if ($item->user_id !== auth()->id()) abort(403);

        $item->quantity = $request->quantity;
        $item->save();

        return redirect()->back()->with('status_key', 'cart_updated');
    }

    public function remove($id) {
        $item = CartItem::findOrFail($id);
        if ($item->user_id !== auth()->id()) abort(403);

        $item->delete();

        return redirect()->back()->with('status_key', 'item_removed');
    }
}