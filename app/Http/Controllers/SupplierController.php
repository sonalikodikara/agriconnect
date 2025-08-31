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
                'website','established','experience'
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

    public function edit(Supplier $supplier)
    {
        // Render the same Dashboard/SupplierProfile page in "edit" mode
        return Inertia::render('Dashboard/SupplierProfile', [
            'supplier' => $supplier,
            'mode'     => 'edit',
        ]);
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

            DB::commit();
            return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
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
        // Fetch the supplier for the logged-in user
        $supplier = Supplier::where('user_id', auth()->id())->first();

        return Inertia::render('Supplier/Profile', [
            'supplier' => $supplier
        ]);
    }

}
