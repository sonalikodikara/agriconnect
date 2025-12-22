<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\Order;
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

            // Encode arrays as JSON for database storage
            $data['specialization'] = json_encode($request->input('specialization', []));
            $data['certifications'] = json_encode($request->input('certifications', []));

            if ($request->hasFile('profile_image')) {
                $data['profile_image'] = $request->file('profile_image')->store('suppliers/profile', 'public');
            }
            if ($request->hasFile('cover_image')) {
                $data['cover_image'] = $request->file('cover_image')->store('suppliers/cover', 'public');
            }

            Supplier::create($data);

            DB::commit();

            // Redirect to profile after creation
            return redirect()->route('suppliers.profile.show')
                ->with('success', 'Supplier profile created successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Supplier/Profile', ['supplier' => $supplier]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Supplier/SupplierProfile', ['supplier' => $supplier]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $data = $request->only([
            'business_name','contact_person','email','phone',
            'address','district','province','description',
            'website','established','experience'
        ]);

        // Normalize and encode arrays
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

        return redirect()->route('suppliers.profile.show')->with('status_key', 'supplier.updated_successfully');
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
            $supplier->profile_image = $supplier->profile_image ? asset('storage/' . $supplier->profile_image) : null;
            $supplier->cover_image = $supplier->cover_image ? asset('storage/' . $supplier->cover_image) : null;
        }
        $products = $supplier ? $supplier->products : [];
        $flash = session()->has('status_key') ? ['status_key' => session('status_key')] : null;

        // Fetch orders containing this supplier's products, with only their items
        $supplierOrders = Order::whereHas('items', function ($query) use ($supplier) {
            $query->where('supplier_id', $supplier->id);
        })->with(['items' => function ($query) use ($supplier) {
            $query->where('supplier_id', $supplier->id)->with('product');
        }])->latest()->get();

        return Inertia::render('Supplier/Profile', [
            'supplier' => $supplier,
            'products' => $products,
            'flash' => $flash,
            'orders' => $supplierOrders,
        ]);
    }
}