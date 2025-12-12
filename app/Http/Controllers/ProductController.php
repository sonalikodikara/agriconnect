<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'category' => 'required|string',
            'quality' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|numeric|min:0',
            'quantity_unit' => 'required|string|in:kg,ltr,tons,packets',
            'description' => 'required|string',
            'minimum_order' => 'nullable|integer|min:1',
            'packaging_size' => 'nullable|string',

            // NPK & Nutrition
            'npk.nitrogen' => 'nullable|string',
            'npk.phosphorous' => 'nullable|string',
            'npk.potassium' => 'nullable|string',
            'otherNutrition.organicMatter' => 'nullable|string',
            'otherNutrition.moisture' => 'nullable|string',
            'otherNutrition.ph' => 'nullable|string',

            // Arrays
            'ingredients.*' => 'string',
            'micronutrients.*' => 'string',

            // Advanced
            'manufacturingDetails' => 'nullable|string',
            'soilType' => 'nullable|string',
            'instructions' => 'nullable|string',
            'safetyStorage' => 'nullable|string',

            // Files
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'optional_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'certificates.*' => 'nullable|mimes:pdf,jpeg,png,jpg|max:5120',
        ]);

        $data = $request->all();

        // Handle JSON fields
        $data['npk'] = [
            'nitrogen' => $request->input('npk.nitrogen', ''),
            'phosphorous' => $request->input('npk.phosphorous', ''),
            'potassium' => $request->input('npk.potassium', ''),
        ];

        $data['other_nutrition'] = [
            'organicMatter' => $request->input('otherNutrition.organicMatter', ''),
            'moisture' => $request->input('otherNutrition.moisture', ''),
            'ph' => $request->input('otherNutrition.ph', ''),
        ];

        $data['ingredients'] = $request->input('ingredients', []);
        $data['micronutrients'] = $request->input('micronutrients', []);

        $data['supplier_id'] = $supplier->id;

        // Handle file uploads
        if ($request->hasFile('primary_image')) {
            $data['primary_image'] = $request->file('primary_image')->store('products/primary', 'public');
        }

        if ($request->hasFile('optional_images')) {
            $paths = [];
            foreach ($request->file('optional_images') as $file) {
                $paths[] = $file->store('products/optional', 'public');
            }
            $data['optional_images'] = $paths;
        }

        if ($request->hasFile('certificates')) {
            $paths = [];
            foreach ($request->file('certificates') as $file) {
                $paths[] = $file->store('products/certificates', 'public');
            }
            $data['certificates'] = $paths;
        }

        Product::create($data);

        return redirect()->back()->with('status_key', 'product.saved_successfully');   
    }
}