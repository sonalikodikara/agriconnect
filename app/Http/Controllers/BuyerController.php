<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BuyerController extends Controller
{
    /*
    public function profile()
    {
        // No additional profile check needed for buyer
        return Inertia::render('Buyer/BuyerProfile');
    }
        */

    public function dashboard()
    {
        return Inertia::render('Buyer/BuyerProfile', [
            'auth' => auth()->user(),
            'recentOrders' => [], // Fetch from DB
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
}