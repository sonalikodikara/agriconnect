<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
<<<<<<< HEAD
=======
use Illuminate\Support\Facades\Log;
>>>>>>> AG-26
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
<<<<<<< HEAD
        $orders = Order::with([
            'items.product.supplier'
        ])->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render(
            'Buyer/Orders',
            ['orders' => $orders,]
        );
=======
        $orders = Order::with(['items.product.supplier', 'rating'])
            ->where('user_id', Auth::id())
            ->latest('updated_at') // Order by updated_at to show recently changed orders first
            ->get();

        // Append status_label and status_color to each order for frontend
        $orders = $orders->map(function ($order) {
            $order->status_label = $order->status_label;
            $order->status_color = $order->status_color;
            // Check if order has been rated
            $order->has_rating = $order->rating !== null;
            // Get supplier_id from order items
            $order->supplier_id = $order->items()->first()?->supplier_id;
            return $order;
        });

        return Inertia::render('Buyer/Orders', [
            'orders' => $orders,
        ]);
>>>>>>> AG-26
    }

    public function store(Request $request)
    {
<<<<<<< HEAD
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
=======
        $user = Auth::user();

        // Validation rules
        $rules = [
            'payment_method' => ['required', Rule::in(['card', 'cash'])],
            'delivery_address' => 'required|string|max:500',
            'delivery_phone' => 'required|string|max:20',
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

        // Group cart items by supplier and create separate orders per supplier
        $ordersBySupplier = $cartItems->groupBy(function ($item) {
            return $item->product->supplier_id;
        });

        $createdOrders = [];

        foreach ($ordersBySupplier as $supplierId => $supplierItems) {
            $supplierTotal = $supplierItems->sum(fn($item) => $item->quantity * $item->product->price);

            $order = Order::create([
                'user_id'          => $user->id,
                'total_amount'     => $supplierTotal,
                'status'           => $request->payment_method === 'card' ? 'accepted' : 'pending',
                'delivery_name'    => $user->name,
                'delivery_phone'   => $request->delivery_phone,
                'delivery_address' => $request->delivery_address,
            ]);

            // Get supplier from first item
            $firstItem = $supplierItems->first();
            $supplier = $firstItem->product->supplier;

            foreach ($supplierItems as $item) {
                OrderItem::create([
                    'order_id'          => $order->id,
                    'product_id'        => $item->product_id,
                    'supplier_id'       => $item->product->supplier_id,
                    'quantity'          => $item->quantity,
                    'price_at_purchase' => $item->product->price,
                ]);
            }

            // Send WhatsApp notification to supplier
            if ($supplier && $supplier->phone) {
                try {
                    $productNames = $supplierItems->map(fn($i) => "{$i->product->name} x{$i->quantity}")->toArray();
                    $whatsappUrl = \App\Services\WhatsAppService::sendOrderNotificationToSupplier(
                        $supplier->phone,
                        $order->id,
                        $user->name,
                        $productNames
                    );
                    Log::info('WhatsApp notification URL generated for supplier', [
                        'order_id' => $order->id,
                        'supplier_id' => $supplier->id,
                        'whatsapp_url' => $whatsappUrl,
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to generate WhatsApp notification for supplier', [
                        'order_id' => $order->id,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            $createdOrders[] = $order;
        }

        CartItem::where('user_id', $user->id)->delete();

        // If multiple orders created, redirect to orders page with success message
        if (count($createdOrders) > 1) {
            return redirect()
                ->route('buyers.orders')
                ->with('status_key', 'Orders Placed Successfully');
        }

        // Single order - redirect normally
        return redirect()
            ->route('buyers.orders')
            ->with('status_key', 'Order Placed Successfully');
    }

    /**
     * Update order status (for suppliers)
     */
    public function updateStatus(Request $request, Order $order)
    {
        // Verify that the authenticated user is a supplier and owns products in this order
        $supplier = \App\Models\Supplier::where('user_id', Auth::id())->first();
        
        if (!$supplier) {
            return back()->withErrors(['error' => 'Only suppliers can update order status.']);
        }

        // Verify that this order contains products from this supplier
        $hasSupplierItems = $order->items()
            ->where('supplier_id', $supplier->id)
            ->exists();

        if (!$hasSupplierItems) {
            return back()->withErrors(['error' => 'You can only update orders containing your products.']);
        }

        // Validate status
        $validStatuses = ['pending', 'accepted', 'packed', 'dispatched', 'out_for_delivery', 'delivered', 'cancelled'];
        $request->validate([
            'status' => ['required', Rule::in($validStatuses)],
        ]);

        $oldStatus = $order->status;
        $order->status = $request->status;
        $order->save();

        // Generate WhatsApp notification URL for buyer
        $whatsappUrl = null;
        if ($order->delivery_phone) {
            try {
                $whatsappUrl = \App\Services\WhatsAppService::sendStatusUpdateToBuyer(
                    $order->delivery_phone,
                    $order->id,
                    $order->status
                );
                Log::info('WhatsApp notification URL generated for buyer', [
                    'order_id' => $order->id,
                    'buyer_phone' => $order->delivery_phone,
                    'status' => $order->status,
                    'whatsapp_url' => $whatsappUrl,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to generate WhatsApp notification for buyer', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        // Return the WhatsApp URL in the response so frontend can open it
        return back()->with([
            'status_key' => 'Order status updated successfully.',
            'whatsapp_url' => $whatsappUrl, // Pass URL to frontend
        ]);
    }
}
>>>>>>> AG-26
