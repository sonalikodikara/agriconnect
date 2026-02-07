<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class BuyerController extends Controller
{
    
    public function dashboard()
    {
        $orders = Order::with(['items.product'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return inertia('Buyer/Orders', [
            'orders' => $orders
=======
use App\Models\Order;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BuyerController extends Controller
{

    public function dashboard()
    {
        $userId = Auth::id();

        // Fetch recent orders (last 5 orders) - same query as OrderController
        $orders = Order::with(['items.product'])
            ->where('user_id', $userId)
            ->latest('created_at')
            ->limit(5)
            ->get();

        // Debug: Log what we're getting
        Log::info('Buyer Dashboard - User ID: ' . $userId);
        Log::info('Buyer Dashboard - Orders found: ' . $orders->count());
        if ($orders->count() > 0) {
            Log::info('Buyer Dashboard - First order ID: ' . $orders->first()->id);
        }

        // Format orders for frontend
        $formattedOrders = $orders->map(function ($order) {
            // Create items string summary
            $itemsSummary = $order->items->map(function ($item) {
                if ($item->product) {
                    return "{$item->product->name} × {$item->quantity}";
                }
                return "Product #{$item->product_id} × {$item->quantity}";
            })->implode(', ');

            return [
                'id' => $order->id,
                'items' => $itemsSummary ?: 'No items',
                'total' => (float) $order->total_amount,
                'status' => $order->status,
                'created_at' => $order->created_at ? $order->created_at->toDateTimeString() : now()->toDateTimeString(),
            ];
        })->values()->toArray(); // Use values() to reindex and ensure proper array

        // Get cart count
        $cartCount = CartItem::where('user_id', $userId)->count();

        $user = Auth::user();

        Log::info('Buyer Dashboard - Formatted orders count: ' . count($formattedOrders));

        return Inertia::render('Buyer/BuyerProfile', [
            'auth' => ['user' => $user],
            'orders' => $formattedOrders,
            'cartCount' => $cartCount,
>>>>>>> AG-26
        ]);
    }

    public function cart()
    {
        return Inertia::render('Buyer/Cart', [
            'cartItems' => [], // From session/DB
        ]);
    }

    public function checkout()
    {
        $hasDelivery = true; // Check DB
        if (!$hasDelivery) {
            return redirect()->route('buyers.delivery.edit');
        }
        return Inertia::render('Buyer/Checkout');
    }

    public function saveDelivery(Request $request)
    {
        // Validate and save to DB
        $request->validate([
            'full_name' => 'required',
            'phone' => 'required',
            // ... other fields
        ]);

        // Save logic
        return redirect()->back()->with('status_key', 'delivery_saved');
    }

    public function orders()
    {
        return Inertia::render('Buyer/Orders', [
            'orders' => [], // From DB
        ]);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> AG-26
