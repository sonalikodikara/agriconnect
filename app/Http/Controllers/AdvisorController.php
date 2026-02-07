<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Advisor;

class AdvisorController extends Controller
{
    public function index()
    {
        return Inertia::render('Advisor/AdvisorProfile');
    }

    public function store(Request $request)
    {
        try {
            $user = auth()->user();

            Log::info('Advisor profile creation started', [
                'user_id' => $user->id,
                'has_profile_image' => $request->hasFile('profile_image'),
                'has_cover_image' => $request->hasFile('cover_image'),
            ]);

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
                'profile_image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
                'cover_image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:4096',
                'available_time' => 'nullable|array',
            ]);

            // Handle arrays
            $validated['specialization'] = json_encode($validated['specialization'] ?? []);
            $validated['certifications'] = json_encode($validated['certifications'] ?? []);
            $validated['available_time'] = json_encode($validated['available_time'] ?? []);

            // Handle file uploads
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                // Additional validation
                if ($file->isValid() && $file->getSize() <= 2048 * 1024) {
                    $validated['profile_image'] = $file->store('advisors', 'public');
                } else {
                    return back()->withErrors(['profile_image' => 'Invalid profile image file.']);
                }
            }

            if ($request->hasFile('cover_image')) {
                $file = $request->file('cover_image');
                // Additional validation
                if ($file->isValid() && $file->getSize() <= 4096 * 1024) {
                    $validated['cover_image'] = $file->store('advisors', 'public');
                } else {
                    return back()->withErrors(['cover_image' => 'Invalid cover image file.']);
                }
            }

            // Add the user_id
            $validated['user_id'] = $user->id;

            $advisor = Advisor::create($validated);

            Log::info('Advisor profile created successfully', ['advisor_id' => $advisor->id]);

            return redirect()->route('advisors.profile.show')
                ->with('success', 'Advisor profile created successfully!');
        } catch (\Exception $e) {
            Log::error('Advisor profile creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['general' => 'An error occurred: ' . $e->getMessage()]);
        }
    }

    public function profile()
    {
        $advisor = auth()->user()->advisor; // This will now work correctly

        if (!$advisor) {
            // No profile yet → show creation form
            return Inertia::render('Advisor/AdvisorProfile');
        }

        // Convert stored paths to full URLs
        $advisor->profile_image_url = $advisor->profile_image
            ? asset('storage/' . $advisor->profile_image)
            : null;

        $advisor->cover_image_url = $advisor->cover_image
            ? asset('storage/' . $advisor->cover_image)
            : null;

        return Inertia::render('Advisor/Profile', [
            'advisor' => $advisor,
        ]);
    }

    public function specialties()
    {
        $advisor = auth()->user()->advisor;

        if (!$advisor) {
            return redirect()->route('advisors.profile.show');
        }

        return Inertia::render('Advisor/Specialties', [
            'advisor' => $advisor,
            'specializations' => $advisor->specialization ?? [],
        ]);
    }

    public function updateSpecialties(Request $request)
    {
        $advisor = auth()->user()->advisor;

        $validated = $request->validate([
            'specializations' => 'required|array',
            'specializations.*.name' => 'required|string|max:255',
            'specializations.*.details' => 'required|string',
            'specializations.*.whatsapp' => 'nullable|string|regex:/^07\d{8}$/',
            'specializations.*.other_contacts' => 'nullable|string',
            'specializations.*.images' => 'nullable|array',
            'specializations.*.images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle image uploads for each specialization
        $specializations = $validated['specializations'];
        foreach ($specializations as &$spec) {
            if (isset($spec['images']) && is_array($spec['images'])) {
                $imagePaths = [];
                foreach ($spec['images'] as $image) {
                    if ($image) {
                        $imagePaths[] = $image->store('advisors/specialties', 'public');
                    }
                }
                $spec['images'] = $imagePaths;
            }
        }

        $advisor->specialization = $specializations;
        $advisor->save();

        return redirect()->route('advisors.profile.show')
            ->with('status_key', 'specializations.updated_successfully');
    }

    public function certifications()
    {
        $advisor = auth()->user()->advisor;

        if (!$advisor) {
            return redirect()->route('advisors.profile.show');
        }

        return Inertia::render('Advisor/Certifications', [
            'advisor' => $advisor,
            'certifications' => $advisor->certifications ?? [],
        ]);
    }

    public function updateCertifications(Request $request)
    {
        $advisor = auth()->user()->advisor;

        $validated = $request->validate([
            'certifications' => 'required|array',
            'certifications.*.name' => 'required|string|max:255',
            'certifications.*.details' => 'required|string',
            'certifications.*.whatsapp' => 'nullable|string|regex:/^07\d{8}$/',
            'certifications.*.other_contacts' => 'nullable|string',
            'certifications.*.images' => 'nullable|array',
            'certifications.*.images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle image uploads for each certification
        $certifications = $validated['certifications'];
        foreach ($certifications as &$cert) {
            if (isset($cert['images']) && is_array($cert['images'])) {
                $imagePaths = [];
                foreach ($cert['images'] as $image) {
                    if ($image) {
                        $imagePaths[] = $image->store('advisors/certifications', 'public');
                    }
                }
                $cert['images'] = $imagePaths;
            }
        }

        $advisor->certifications = $certifications;
        $advisor->save();

        return redirect()->route('advisors.profile.show')
            ->with('status_key', 'certifications.updated_successfully');
    }

    /**
     * Display public advisor profile
     */
    public function show(Advisor $advisor)
    {
        try {
            // Load user relationship if user_id exists
            if ($advisor->user_id) {
                $advisor->load('user');
            }

            // Ensure image URLs are set
            if ($advisor->profile_image && !$advisor->profile_image_url) {
                $advisor->profile_image_url = asset('storage/' . $advisor->profile_image);
            }
            if ($advisor->cover_image && !$advisor->cover_image_url) {
                $advisor->cover_image_url = asset('storage/' . $advisor->cover_image);
            }

            // Parse JSON fields to arrays if they're strings
            if (is_string($advisor->specialization)) {
                $advisor->specialization = json_decode($advisor->specialization, true) ?? [];
            }
            if (is_string($advisor->certifications)) {
                $advisor->certifications = json_decode($advisor->certifications, true) ?? [];
            }
            if (is_string($advisor->available_time)) {
                $advisor->available_time = json_decode($advisor->available_time, true) ?? [];
            }

            return Inertia::render('Advisor/PublicProfile', [
                'advisor' => $advisor,
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading advisor profile', [
                'advisor_id' => $advisor->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['error' => 'Failed to load advisor profile.']);
        }
    }
}
