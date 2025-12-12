<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use App\Models\Advisor; // Assuming there's an Advisor model

class ProductListController extends Controller
{
    public function seeds()
    {
        $products = Product::where('category', 'like', '%seed%')
            ->orWhere('category', 'like', '%seed%')
            ->with('supplier')
            ->get();

        return Inertia::render('ListPages/Seed', [
            'products' => $products,
            'category_name' => 'Seeds',
        ]);
    }

    public function fertilizer()
    {
        $products = Product::where('category', 'like', '%fertilizer%')
            ->orWhere('category', 'like', '%පොහොර%')
            ->orWhere('category', 'like', '%உரம்%')
            ->with('supplier')
            ->get();

        return Inertia::render('ListPages/Fertilizer', [
            'products' => $products,
            'category_name' => 'Fertilizer',
        ]);
    }

    public function equipment()
    {
        $products = Product::whereIn('category', ['irrigation_equipment', 'farm_tools', 'greenhouse_materials'])
            ->with('supplier')
            ->get();

        return Inertia::render('ListPages/Equipment', [
            'products' => $products,
            'category_name' => 'Equipment & Tools',
        ]);
    }

    public function vehicles() {
        $products = Product::where('category', 'like', '%vehicle%')
            ->orWhere('category', 'like', '%tractor%')
            ->with('supplier')->get();

        return Inertia::render('ListPages/Vehicles', [
            'products' => $products,
            'category_name' => 'Vehicles',
        ]);
    }

   public function advisors()
    {
        $advisors = Advisor::all(); // This works now

        return Inertia::render('ListPages/Advisors', [
            'advisors' => $advisors,         // ← correct name
            'category_name' => 'Advisors & Consultants',
        ]);
    }

    public function pesticides() {
        $products = Product::where('category', 'like', '%pesticide%') // Fixed matching
            ->orWhere('category', 'like', '%herbicide%')
            ->orWhere('category', 'like', '%fungicide%')
            ->orWhere('category', 'like', '%insecticide%')
            ->orWhere('category', 'like', '%පළිබෝධනාශක%') // Sinhala
            ->orWhere('category', 'like', '%பூச்சிக்கொல்லி%') // Tamil
            ->with('supplier')
            ->get();

        return Inertia::render('ListPages/Pesticides', [
            'products' => $products,
            'category_name' => 'Pesticides',
        ]);
    }

    public function others()
    {
        $excluded = ['seed', 'fertilizer', 'pesticide', 'herbicide', 'fungicide', 'insecticide', 'irrigation', 'tool', 'greenhouse'];
        $products = Product::where(function ($query) use ($excluded) {
            foreach ($excluded as $term) {
                $query->where('category', 'not like', "%{$term}%");
            }
        })->with('supplier')->get();

        return Inertia::render('ListPages/Others', [
            'products' => $products,
            'category_name' => 'Other Products',
        ]);
    }
}