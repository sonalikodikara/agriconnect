<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Advisor;
use Inertia\Inertia;

class ProductListController extends Controller
{
    public function seeds()
    {
        $products = Product::where('category', 'like', '%seed%')
            ->with('supplier')
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

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
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

        return Inertia::render('ListPages/Fertilizer', [
            'products' => $products,
            'category_name' => 'Fertilizer',
        ]);
    }

    public function equipment()
    {
        $products = Product::whereIn('category', ['irrigation_equipment', 'farm_tools', 'greenhouse_materials'])
            ->with('supplier')
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

        return Inertia::render('ListPages/Equipment', [
            'products' => $products,
            'category_name' => 'Equipment & Tools',
        ]);
    }

    public function vehicles()
    {
        $products = Product::where('category', 'like', '%vehicle%')
            ->orWhere('category', 'like', '%tractor%')
            ->with('supplier')
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

        return Inertia::render('ListPages/Vehicles', [
            'products' => $products,
            'category_name' => 'Vehicles',
        ]);
    }

    public function pesticides()
    {
        $products = Product::where('category', 'like', '%pesticide%')
            ->orWhere('category', 'like', '%herbicide%')
            ->orWhere('category', 'like', '%fungicide%')
            ->orWhere('category', 'like', '%insecticide%')
            ->orWhere('category', 'like', '%පළිබෝධනාශක%')
            ->orWhere('category', 'like', '%பூச்சிக்கொல்லி%')
            ->with('supplier')
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

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
        })
        ->with('supplier')
        ->get()
        ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

        return Inertia::render('ListPages/Others', [
            'products' => $products,
            'category_name' => 'Other Products',
        ]);
    }

    public function advisors()
    {
        $advisors = Advisor::all();

        return Inertia::render('ListPages/Advisors', [
            'advisors' => $advisors,
            'category_name' => 'Advisors & Consultants',
        ]);
    }
}