<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Admin dashboard/profile
        return Inertia::render('Admin/AdminProfile');
    }
}