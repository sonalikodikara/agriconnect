<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with([
            'items.product.supplier'
        ])->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render(
            'Buyer/Orders',
            ['orders' => $orders,]
        );
    }

    public function store(Request $request)
    {
        // VALIDATION 
        $validated = $request->validate([
            'delivery_name' => 'required|string|max:255',
            'delivery_phone' => 'required|string|max:15',
            'delivery_address' => 'required|string|max:500',
            'payment_method' => 'required|in:cash,card',

            // Card required ONLY when card selected 
            'card_holder_name' => 'required_if:payment_method,card|string|max:255',
            'card_number' => 'required_if:payment_method,card|digits:16',
            'expiry' => 'required_if:payment_method,card|string|max:5',
            'cvv' => 'required_if:payment_method,card|digits:3',
        ]);

        $cartItems = CartItem::with('product')
            ->where('user_id', Auth::id())
            ->get();
        if ($cartItems->isEmpty()) {
            return back()->withErrors(['cart' => 'validation.cart_empty']);
        }
        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);
        $supplier_id = $cartItems->first()->product->supplier_id;

        // CREATE ORDER WITH DELIVERY DETAILS 
        $order = Order::create([
            'user_id' => Auth::id(),
            'supplier_id' => $supplier_id,
            'total_amount' => $total,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],

            'delivery_name' => $validated['delivery_name'],
            'delivery_phone' => $validated['delivery_phone'],
            'delivery_address' => $validated['delivery_address'],
        ]);

        // SAVE ORDER ITEMS 
        foreach ($cartItems as $item) {
            OrderItem::create([
                'supplier_id' => $item->product->supplier_id,
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_purchase' => $item->product->price,
            ]);
        }

        // CLEAR CART 
        CartItem::where('user_id', Auth::id())->delete();

        return redirect()->route('buyers.orders')
            ->with('status_key', 'Successfully placed order!');
    }
}
