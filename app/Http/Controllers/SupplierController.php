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
        return Inertia::render('Dashboard/SupplierProfile', [
            'suppliers' => $suppliers,
            'mode'      => 'index',
        ]);
    }

    public function create()
    {
        // Render the same Dashboard/SupplierProfile page in "create" mode
        return Inertia::render('Dashboard/SupplierProfile', [
            'supplier' => null,
            'mode'     => 'create',
        ]);
    }

    public function store(StoreSupplierRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->only([
                'business_name','contact_person','email','phone',
                'address','district','province','description',
                'website','established','experience', 'specialization','certifications'
            ]);

            $data['user_id'] = auth()->id();

            if ($request->hasFile('profile_image')) {
                $data['profile_image'] = $request->file('profile_image')->store('suppliers/profile', 'public');
            }
            if ($request->hasFile('cover_image')) {
                $data['cover_image'] = $request->file('cover_image')->store('suppliers/cover', 'public');
            }

            Supplier::create($data);

            DB::commit();

            // correct route name
            return redirect()->route('suppliers.profile.show')
                ->with('success', 'Supplier created successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Dashboard/SupplierProfile', [
            'supplier' => $supplier,
            'mode'     => 'show',
        ]);
    }

    public function edit()
    {
        // Fetch the supplier for the logged-in user
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();

        // Fetch districts and provinces for select inputs
         $districts = [
            ['key' => 'Colombo', 'label' => 'Colombo'],
            ['key' => 'Kandy', 'label' => 'Kandy'],
            ['key' => 'Galle', 'label' => 'Galle'],
            ['key' => 'Matara', 'label' => 'Matara'],
            ['key' => 'Jaffna', 'label' => 'Jaffna'],
            ['key' => 'Anuradhapura', 'label' => 'Anuradhapura'],
            ['key' => 'Polonnaruwa', 'label' => 'Polonnaruwa'],
            ['key' => 'Trincomalee', 'label' => 'Trincomalee'],
            ['key' => 'Batticaloa', 'label' => 'Batticaloa'],
            ['key' => 'Ampara', 'label' => 'Ampara'],
            ['key' => 'Badulla', 'label' => 'Badulla'],
            ['key' => 'Nuwara Eliya', 'label' => 'Nuwara Eliya'],
            ['key' => 'Ratnapura', 'label' => 'Ratnapura'],
            ['key' => 'Kegalle', 'label' => 'Kegalle'],
            ['key' => 'Kurunegala', 'label' => 'Kurunegala'],
            ['key' => 'Puttalam', 'label' => 'Puttalam'],
            ['key' => 'Gampaha', 'label' => 'Gampaha'],
            ['key' => 'Kalutara', 'label' => 'Kalutara'],
            ['key' => 'Matale', 'label' => 'Matale'],
            ['key' => 'Kegalle', 'label' => 'Kegalle'],
            ['key' => 'Hambantota', 'label' => 'Hambantota'],
            ['key' => 'Monaragala', 'label' => 'Monaragala'],
            ['key' => 'Mannar', 'label' => 'Mannar'],
            ['key' => 'Vavuniya', 'label' => 'Vavuniya'],
            ['key' => 'Mullaitivu', 'label' => 'Mullaitivu'],
            ['key' => 'Kilinochchi', 'label' => 'Kilinochchi'],
            ['key' => 'Nuwara Eliya', 'label' => 'Nuwara Eliya'],
            ['key' => 'Polonnaruwa', 'label' => 'Polonnaruwa'],
            ['key' => 'Trincomalee', 'label' => 'Trincomalee'],
            // ... add all districts
        ];

        $provinces = [
            ['key' => 'Western', 'label' => 'Western'],
            ['key' => 'Central', 'label' => 'Central'],
            ['key' => 'Southern', 'label' => 'Southern'],
            ['key' => 'Northern', 'label' => 'Northern'],
            ['key' => 'Eastern', 'label' => 'Eastern'],
            ['key' => 'North Western', 'label' => 'North Western'],
            ['key' => 'North Central', 'label' => 'North Central'],
            ['key' => 'Uva', 'label' => 'Uva'],
            ['key' => 'Sabaragamuwa', 'label' => 'Sabaragamuwa'],
        ];

        // Decode JSON fields for Inertia
        $supplier->specialization = $supplier->specialization ? json_decode($supplier->specialization) : [];
        $supplier->certifications = $supplier->certifications ? json_decode($supplier->certifications) : [];

        return Inertia::render('Supplier/Edit', [
            'supplier' => $supplier,
            'districts' => $districts,
            'provinces' => $provinces,
        ]);
    }


    public function update(UpdateSupplierRequest $request)
    {
        $supplier = Supplier::where('user_id', auth()->id())->firstOrFail();

        $data = $request->only([
            'business_name','contact_person','email','phone',
            'address','district','province','description',
            'website','established','experience', 'specialization','certifications' 
        ]);

        $data['specialization'] = json_encode($this->normalizeArrayInput($request->input('specialization', [])));
        $data['certifications'] = json_encode($this->normalizeArrayInput($request->input('certifications', [])));


        if ($request->hasFile('profile_image')) {
            if ($supplier->profile_image) {
                Storage::disk('public')->delete($supplier->profile_image);
            }
            $data['profile_image'] = $request->file('profile_image')->store('suppliers/profile', 'public');
        }

        if ($request->hasFile('cover_image')) {
            if ($supplier->cover_image) {
                Storage::disk('public')->delete($supplier->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('suppliers/cover', 'public');
        }

        $supplier->update($data);

        return redirect()->route('suppliers.profile.show')->with('success', 'Supplier updated successfully.');
    }

    public function destroy(Supplier $supplier)
    {
        if ($supplier->profile_image) {
            Storage::disk('public')->delete($supplier->profile_image);
        }
        if ($supplier->cover_image) {
            Storage::disk('public')->delete($supplier->cover_image);
        }
        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier removed.');
    }

    protected function normalizeArrayInput($value): array
    {
        if (is_array($value)) {
            return array_values(array_filter(array_map('trim', $value)));
        }

        if (is_null($value) || $value === '') {
            return [];
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return array_values(array_filter(array_map('trim', $decoded)));
            }
            return array_values(array_filter(array_map('trim', explode(',', $value))));
        }

        return [];
    }


    public function profile()
    {
        $supplier = Supplier::where('user_id', auth()->id())->first();

        if ($supplier) {
            $supplier->specialization = $supplier->specialization ? json_decode($supplier->specialization) : [];
            $supplier->certifications = $supplier->certifications ? json_decode($supplier->certifications) : [];
            $supplier->profile_image = $supplier->profile_image ? asset('storage/' . $supplier->profile_image) : null;
            $supplier->cover_image = $supplier->cover_image ? asset('storage/' . $supplier->cover_image) : null;
        }

        return Inertia::render('Supplier/Profile', [
            'supplier' => $supplier,
        ]);
    }


}
