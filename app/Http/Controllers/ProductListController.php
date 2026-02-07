<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Advisor;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductListController extends Controller
{
    public function seeds()
    {
        $products = Product::where('category', 'like', '%seed%')
            ->with('supplier.ratings')
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
            ->with('supplier.ratings')
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
            ->with('supplier.ratings')
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
            ->with('supplier.ratings')
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
            ->with('supplier.ratings')
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
            ->with('supplier.ratings')
            ->get()
            ->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);

        return Inertia::render('ListPages/Others', [
            'products' => $products,
            'category_name' => 'Other Products',
        ]);
    }

    public function advisors()
    {
        $query = Advisor::query();

        // Filter by specialty
        if (request()->has('specialty') && request()->specialty) {
            $specialty = request()->specialty;
            $query->where(function ($q) use ($specialty) {
                $q->whereJsonContains('specialization', $specialty)
                    ->orWhere('specialization', 'like', '%' . $specialty . '%');
            });
        }

        // Filter by province
        if (request()->has('province') && request()->province) {
            $query->where('province', request()->province);
        }

        $advisors = $query->get()->map(function ($advisor) {
            // Ensure profile_image_url is set if profile_image exists
            if ($advisor->profile_image && !$advisor->profile_image_url) {
                $advisor->profile_image_url = asset('storage/' . $advisor->profile_image);
            }

            // Parse JSON strings to arrays if needed
            if (is_string($advisor->specialization)) {
                $advisor->specialization = json_decode($advisor->specialization, true) ?? [];
            }
            if (is_string($advisor->certifications)) {
                $advisor->certifications = json_decode($advisor->certifications, true) ?? [];
            }
            if (is_string($advisor->available_time)) {
                $advisor->available_time = json_decode($advisor->available_time, true) ?? [];
            }

            return $advisor;
        });

        // Get unique specialties and provinces for filter dropdowns
        $allAdvisors = Advisor::all();
        $specialties = collect();
        $provinces = collect();

        foreach ($allAdvisors as $advisor) {
            if ($advisor->specialization) {
                $specs = is_array($advisor->specialization)
                    ? $advisor->specialization
                    : json_decode($advisor->specialization, true) ?? [];
                if (is_array($specs)) {
                    $specialties = $specialties->merge($specs);
                }
            }
            if ($advisor->province) {
                $provinces->push($advisor->province);
            }
        }

        Log::info('Advisors listing', [
            'count' => $advisors->count(),
            'advisors' => $advisors->pluck('id', 'name')->toArray(),
        ]);

        return Inertia::render('ListPages/Advisors', [
            'advisors' => $advisors,
            'category_name' => 'Advisors & Consultants',
            'filters' => [
                'specialties' => $specialties->unique()->filter()->values()->all(),
                'provinces' => $provinces->unique()->filter()->values()->all(),
            ],
            'currentFilters' => [
                'specialty' => request()->specialty ?? '',
                'province' => request()->province ?? '',
            ],
        ]);
    }
}
