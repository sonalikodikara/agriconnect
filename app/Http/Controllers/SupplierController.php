<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::latest()->paginate(15);
        // If using Inertia + React, pass suppliers (adjust resource/transform if needed)
        return Inertia::render('Suppliers/Index', ['suppliers' => $suppliers]);
    }

    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    public function store(StoreSupplierRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->only([
                'business_name','contact_person','email','phone',
                'address','district','province','description',
                'website','established','experience'
            ]);

            // Normalize specialization & certifications into arrays
            $data['specialization'] = $this->normalizeArrayInput($request->input('specialization', []));
            $data['certifications'] = $this->normalizeArrayInput($request->input('certifications', []));

            // Handle profile image
            if ($request->hasFile('profile_image')) {
                $data['profile_image'] = $request->file('profile_image')->store('suppliers/profile', 'public');
            }

            // Handle cover image
            if ($request->hasFile('cover_image')) {
                $data['cover_image'] = $request->file('cover_image')->store('suppliers/cover', 'public');
            }

            $supplier = Supplier::create($data);

            DB::commit();

            return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            // Log error as needed
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Show', ['supplier' => $supplier]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', ['supplier' => $supplier]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        DB::beginTransaction();
        try {
            $data = $request->only([
                'business_name','contact_person','email','phone',
                'address','district','province','description',
                'website','established','experience'
            ]);

            $data['specialization'] = $this->normalizeArrayInput($request->input('specialization', []));
            $data['certifications'] = $this->normalizeArrayInput($request->input('certifications', []));

            // Replace profile image if uploaded
            if ($request->hasFile('profile_image')) {
                // delete old
                if ($supplier->profile_image) {
                    Storage::disk('public')->delete($supplier->profile_image);
                }
                $data['profile_image'] = $request->file('profile_image')->store('suppliers/profile', 'public');
            }

            // Replace cover image if uploaded
            if ($request->hasFile('cover_image')) {
                if ($supplier->cover_image) {
                    Storage::disk('public')->delete($supplier->cover_image);
                }
                $data['cover_image'] = $request->file('cover_image')->store('suppliers/cover', 'public');
            }

            $supplier->update($data);

            DB::commit();

            return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Supplier $supplier)
    {
        // Delete stored images
        if ($supplier->profile_image) {
            Storage::disk('public')->delete($supplier->profile_image);
        }
        if ($supplier->cover_image) {
            Storage::disk('public')->delete($supplier->cover_image);
        }
        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier removed.');
    }

    /**
     * Helper: normalize input to array.
     * Accepts:
     *  - array,
     *  - JSON string,
     *  - comma separated string
     */
    protected function normalizeArrayInput($value): array
    {
        if (is_array($value)) {
            return array_values(array_filter(array_map('trim', $value)));
        }

        if (is_null($value) || $value === '') {
            return [];
        }

        if (is_string($value)) {
            // try json decode
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return array_values(array_filter(array_map('trim', $decoded)));
            }
            // comma separated fallback
            return array_values(array_filter(array_map('trim', explode(',', $value))));
        }

        return [];
    }
}
