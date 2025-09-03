<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Advisor;

class AdvisorController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/AdvisorProfile');
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:advisors,email',
            'phone' => 'required|string|max:20',
            'district' => 'required|string',
            'province' => 'required|string',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'qualifications' => 'nullable|string',
            'specialization' => 'nullable|array',
            'certifications' => 'nullable|array',
            'website' => 'nullable|url',
            'established' => 'nullable|date',
            'experience' => 'nullable|integer',
            'profile_image' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request->file('profile_image')->store('advisors', 'public');
        }

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('advisors', 'public');
        }

        Advisor::create($validated);

        return back()->with('success', 'Advisor profile saved successfully!');
    }

    public function profile()
    {
        $advisor = auth()->user()->advisor; // assuming each user has one advisor profile

        if (!$advisor) {
            return redirect()->route('advisor.profile.show')->with('error', 'No advisor profile found.');
        }

        return Inertia::render('Advisor/Profile', [
            'advisor' => $advisor
        ]);
    }
}
