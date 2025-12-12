<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BuyerController extends Controller
{
    public function profile()
    {
        // No additional profile check needed for buyer
        return Inertia::render('Buyer/BuyerProfile');
    }
}