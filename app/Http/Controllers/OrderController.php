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
        $orders = Order::with(['items.product.supplier'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Buyer/Orders', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Validation rules
        $rules = [
            'payment_method' => ['required', Rule::in(['card', 'cash'])],
        ];

        if ($request->payment_method === 'card') {
            $rules += [
                'card_holder_name' => 'required|string|max:255',
                'card_number'      => 'required|digits:16',
                'expiry'           => 'required|regex:/^\d{2}\/\d{2}$/',
                'cvv'              => 'required|digits:3',
            ];
        }

        $request->validate($rules);

        $cartItems = CartItem::with('product.supplier')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors(['error' => 'Your cart is empty.']);
        }

        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

        $order = Order::create([
            'user_id'          => $user->id,
            'total_amount'     => $total,
            'status'           => $request->payment_method === 'card' ? 'confirmed' : 'pending',
            'payment_method'   => $request->payment_method,
            'delivery_name'    => $user->name,
            'delivery_phone'   => 'N/A',
            'delivery_address' => 'N/A',
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id'          => $order->id,
                'product_id'        => $item->product_id,
                'supplier_id'       => $item->product->supplier_id, // Ensure product has supplier_id
                'quantity'          => $item->quantity,
                'price_at_purchase' => $item->product->price,
            ]);
        }

        CartItem::where('user_id', $user->id)->delete();

        return redirect()
            ->route('buyers.orders')
            ->with('status_key', 'Order Placed Successfully');
    }
}