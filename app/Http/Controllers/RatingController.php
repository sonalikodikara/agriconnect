<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\SupplierRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RatingController extends Controller
{
    /**
     * Store a rating for a supplier after order delivery
     */
    public function store(Request $request, Order $order)
    {
        // Validate that the order belongs to the authenticated user
        if ($order->user_id !== Auth::id()) {
            return back()->withErrors(['error' => 'You can only rate orders that belong to you.']);
        }

        // Validate that the order is delivered
        if ($order->status !== 'delivered') {
            return back()->withErrors(['error' => 'You can only rate delivered orders.']);
        }

        // Check if rating already exists for this order
        $existingRating = SupplierRating::where('order_id', $order->id)->first();
        if ($existingRating) {
            return back()->withErrors(['error' => 'You have already rated this order.']);
        }

        // Get supplier_id from order items (since orders table doesn't have supplier_id anymore)
        $supplierId = $order->items()->first()?->supplier_id;
        if (!$supplierId) {
            return back()->withErrors(['error' => 'Unable to find supplier for this order.']);
        }

        // Validate rating data
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        // Create rating
        $rating = SupplierRating::create([
            'order_id' => $order->id,
            'user_id' => Auth::id(),
            'supplier_id' => $supplierId,
            'rating' => $validated['rating'],
            'review' => $validated['review'] ?? null,
        ]);

        // Update supplier's average rating and review count
        $this->updateSupplierRating($supplierId);

        Log::info('Supplier rating created', [
            'rating_id' => $rating->id,
            'order_id' => $order->id,
            'supplier_id' => $supplierId,
            'rating' => $validated['rating'],
        ]);

        return back()->with('status_key', 'rating.submitted_successfully');
    }

    /**
     * Update supplier's average rating and review count
     */
    private function updateSupplierRating($supplierId)
    {
        $supplier = \App\Models\Supplier::find($supplierId);
        if (!$supplier) {
            return;
        }

        $ratings = SupplierRating::where('supplier_id', $supplierId)->get();
        
        if ($ratings->count() > 0) {
            $averageRating = $ratings->avg('rating');
            $supplier->rating = round($averageRating, 2);
            $supplier->review_count = $ratings->count();
        } else {
            $supplier->rating = 0;
            $supplier->review_count = 0;
        }

        $supplier->save();
    }
}
