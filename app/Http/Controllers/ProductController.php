<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProductController extends Controller
{
    public function index()
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();
        $products = Product::where('supplier_id', $supplier->id)->get()->append(['primary_image_url', 'optional_images_urls', 'certificates_urls']);
        return Inertia::render('Supplier/ProductList', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Supplier/AddProduct', ['product' => null]);
    }

    public function edit(Product $product)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();
        if ($product->supplier_id !== $supplier->id) {
            abort(403);
        }

        return Inertia::render('Supplier/AddProduct', ['product' => $product->append(['primary_image_url', 'optional_images_urls', 'certificates_urls'])]);
    }

    public function store(Request $request)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'product_type' => 'required|in:general,vehicle,tool',
            'name' => 'required_if:product_type,general|string|max:255',
            'brand' => 'nullable|string|max:255',
            'category' => 'required_if:product_type,general|string',
            'quality' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|numeric|min:0',
            'quantity_unit' => 'nullable|string|in:kg,ltr,tons,packets,units',
            'description' => 'required|string',
            'minimum_order' => 'nullable|integer|min:1',
            'packaging_size' => 'nullable|string',

            // Vehicle
            'vehicle_type' => 'nullable|string',
            'brand_model' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'engine_power_hp' => 'nullable|string',
            'condition' => 'nullable|string',
            'for_rent' => 'nullable|boolean',
            'rental_price_per_day' => 'nullable|numeric',

            // Tool
            'tool_type' => 'nullable|string',
            'tool_name' => 'nullable|string|max:255',
            'power_source' => 'nullable|string',
            'working_width' => 'nullable|string',

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

        // Add new fields
        $data['product_type'] = $request->product_type;

        if ($request->product_type === 'vehicle') {
            $data['vehicle_type'] = $request->vehicle_type;
            $data['brand_model'] = $request->brand_model;
            if ($request->published_date) {
                $data['year'] = Carbon::parse($request->published_date)->year;
            }
            $data['engine_power_hp'] = $request->engine_power_hp;
            $data['condition'] = $request->condition;
            $data['for_rent'] = $request->has('for_rent');
            $data['rental_price_per_day'] = $request->rental_price_per_day;
            $data['vehicle_features'] = $request->description;
        }

        if ($request->product_type === 'tool') {
            $data['tool_name'] = $request->tool_name;
            $data['tool_type'] = $request->tool_type;
            $data['power_source'] = $request->power_source;
            $data['working_width'] = $request->working_width;
            $data['is_modern'] = in_array($request->tool_type, ['battery', 'tractor_mounted', 'power_tiller']);
            $data['tool_features'] = $request->description;
        }

        Product::create($data);

        return redirect()->back()->with('status_key', 'product.saved_successfully');
    }

    public function update(Request $request, Product $product)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();
        if ($product->supplier_id !== $supplier->id) {
            abort(403);
        }

        $validated = $request->validate([
            'product_type' => 'required|in:general,vehicle,tool',
            'name' => 'required_if:product_type,general|string|max:255',
            'brand' => 'nullable|string|max:255',
            'category' => 'required_if:product_type,general|string',
            'quality' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|numeric|min:0',
            'quantity_unit' => 'nullable|string|in:kg,ltr,tons,packets,units',
            'description' => 'required|string',
            'minimum_order' => 'nullable|integer|min:1',
            'packaging_size' => 'nullable|string',

            // Vehicle
            'vehicle_type' => 'nullable|string',
            'brand_model' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'engine_power_hp' => 'nullable|string',
            'condition' => 'nullable|string',
            'for_rent' => 'nullable|boolean',
            'rental_price_per_day' => 'nullable|numeric',

            // Tool
            'tool_type' => 'nullable|string',
            'tool_name' => 'nullable|string|max:255',
            'power_source' => 'nullable|string',
            'working_width' => 'nullable|string',

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
            'remove_optional_images' => 'nullable|array',
            'remove_certificates' => 'nullable|array',
            'remove_primary' => 'nullable|boolean',
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

        $data['ingredients'] = $request->input('ingredients', $product->ingredients ?? []);
        $data['micronutrients'] = $request->input('micronutrients', $product->micronutrients ?? []);

        // Handle primary image
        if ($request->has('remove_primary') && $request->remove_primary) {
            if ($product->primary_image) {
                Storage::disk('public')->delete($product->primary_image);
            }
            $data['primary_image'] = null;
        }

        if ($request->hasFile('primary_image')) {
            if ($product->primary_image) {
                Storage::disk('public')->delete($product->primary_image);
            }
            $data['primary_image'] = $request->file('primary_image')->store('products/primary', 'public');
        }

        // Handle optional images: remove requested, keep others, append new
        $existingOptionals = $product->optional_images ?? [];
        $removeOptional = $request->input('remove_optional_images', []);
        $remaining = array_values(array_filter($existingOptionals, fn($p) => !in_array($p, $removeOptional)));
        foreach ($removeOptional as $path) {
            Storage::disk('public')->delete($path);
        }
        if ($request->hasFile('optional_images')) {
            foreach ($request->file('optional_images') as $file) {
                $remaining[] = $file->store('products/optional', 'public');
            }
        }
        $data['optional_images'] = $remaining;

        // Certificates
        $existingCerts = $product->certificates ?? [];
        $removeCerts = $request->input('remove_certificates', []);
        $remainingCerts = array_values(array_filter($existingCerts, fn($p) => !in_array($p, $removeCerts)));
        foreach ($removeCerts as $path) {
            Storage::disk('public')->delete($path);
        }
        if ($request->hasFile('certificates')) {
            foreach ($request->file('certificates') as $file) {
                $remainingCerts[] = $file->store('products/certificates', 'public');
            }
        }
        $data['certificates'] = $remainingCerts;

        // Product Type
        $data['product_type'] = $request->product_type;

        // Vehicle
        $data['product_type'] = $request->product_type;
        if ($request->product_type === 'vehicle') {
            $data['vehicle_type'] = $request->vehicle_type;
            $data['brand_model'] = $request->brand_model;
            if ($request->published_date) {
                $data['year'] = Carbon::parse($request->published_date)->year;
            }
            $data['engine_power_hp'] = $request->engine_power_hp;
            $data['condition'] = $request->condition;
            $data['for_rent'] = $request->has('for_rent');
            $data['rental_price_per_day'] = $request->rental_price_per_day;
            $data['vehicle_features'] = $request->description;
        }

        // Tool
        if ($request->product_type === 'tool') {
            $data['tool_name'] = $request->tool_name;
            $data['tool_type'] = $request->tool_type;
            $data['power_source'] = $request->power_source;
            $data['working_width'] = $request->working_width;
            $data['is_modern'] = in_array($request->tool_type, ['battery', 'tractor_mounted', 'power_tiller']);
            $data['tool_features'] = $request->description;
        }

        $product->update($data);

        return redirect()->back()->with('status_key', 'product.updated_successfully');
    }

    public function destroy(Product $product)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();
        if ($product->supplier_id !== $supplier->id) abort(403);

        if ($product->primary_image) Storage::disk('public')->delete($product->primary_image);
        foreach ($product->optional_images ?? [] as $p) Storage::disk('public')->delete($p);
        foreach ($product->certificates ?? [] as $c) Storage::disk('public')->delete($c);

        $product->delete();

        return redirect()->route('suppliers.profile.show')->with('status_key', 'product.deleted_successfully');
    }

    // Public product detail
    public function show(Product $product)
    {
        $product->load('supplier');
        return Inertia::render('Product/Show', ['product' => $product->append(['primary_image_url', 'optional_images_urls', 'certificates_urls'])]);
    }
}
