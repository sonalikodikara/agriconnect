<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CheckoutController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('buyers.cart');
        }

        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

        return inertia('Buyer/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        // If paying by cash, clear card fields to avoid validation errors from empty strings
        if ($request->input('payment_method') === 'cash') {
            $request->merge([
                'card_holder_name' => null,
                'card_number' => null,
                'expiry' => null,
                'cvv' => null,
            ]);
        }

        $request->validate([
            'delivery_name' => 'required|string|max:255',
            'delivery_phone' => 'required|string|max:15',
            'delivery_address' => 'required|string',
            'payment_method' => 'required|in:cash,card',
            'card_holder_name' => 'required_if:payment_method,card|string|max:255',
            'card_number' => 'required_if:payment_method,card|digits:16',
            'expiry' => 'required_if:payment_method,card|date_format:Y-m', // Matches <input type="month">
            'cvv' => 'required_if:payment_method,card|digits:3',
        ]);

        $cartItems = CartItem::with('product')->where('user_id', Auth::id())->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors(['cart' => 'Your cart is empty.']);
        }

        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

        // Assume all items from same supplier for simplicity
        $supplier_id = $cartItems->first()->product->supplier_id;

        // Prepare card expiry date if provided
        $cardExpiryDate = null;
        if ($request->payment_method === 'card' && $request->filled('expiry')) {
            try {
                $cardExpiryDate = Carbon::createFromFormat('Y-m', $request->expiry)->endOfMonth()->toDateString();
            } catch (\Exception $e) {
                // ignore, validation should have caught format issues
            }
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'supplier_id' => $supplier_id,
            'total_amount' => $total,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
            'delivery_name' => $request->delivery_name,
            'delivery_phone' => $request->delivery_phone,
            'delivery_address' => $request->delivery_address,
            'card_expiry' => $cardExpiryDate,
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_purchase' => $item->product->price,
            ]);
        }

        // Clear cart
        CartItem::where('user_id', Auth::id())->delete();

        // Send WhatsApp notifications using free CallMeBot API
        $buyerMessage = "Dear {$request->delivery_name}, your order #{$order->id} has been placed successfully.";
        $supplierMessage = "New order #{$order->id} placed by {$request->delivery_name} for your product(s).";

        $this->sendWhatsapp($request->delivery_phone, $buyerMessage);

        // You can fetch supplier phone from Supplier model
        $supplier = $order->supplier;
        if ($supplier && $supplier->contact_phone) {
            $this->sendWhatsapp($supplier->contact_phone, $supplierMessage);
        }

        return redirect()->route('buyers.orders.index')->with('success', 'Order placed successfully!');
    }

    private function sendWhatsapp($phone, $message)
    {
        // CallMeBot Free API
        $url = "https://api.callmebot.com/whatsapp.php?phone={$phone}&text=" . urlencode($message) . "&apikey=YOUR_FREE_KEY";
        try {
            Http::get($url);
        } catch (\Exception $e) {
            // Log error but don’t fail the order
            Log::error("WhatsApp message failed: {$e->getMessage()}");
        }
    }
}
