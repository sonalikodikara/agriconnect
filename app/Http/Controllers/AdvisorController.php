<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Advisor;
use App\Models\ConsultationAvailability;
use App\Models\ConsultationTimeSlot;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

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

        // Handle arrays
        $validated['specialization'] = json_encode($validated['specialization'] ?? []);
        $validated['certifications'] = json_encode($validated['certifications'] ?? []);

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request->file('profile_image')->store('advisors', 'public');
        }

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('advisors', 'public');
        }

        // Add the user_id
        $validated['user_id'] = $user->id;

        $advisor = Advisor::create($validated);

        return redirect()->route('advisors.profile.show')
            ->with('success', 'Advisor profile created successfully!');
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

        $advisor->load([
            'consultationAvailabilities.timeSlots'
        ]);

        return Inertia::render('Advisor/Profile', [
            'advisor' => $advisor,
            'availabilities' => $advisor->consultationAvailabilities,
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

    public function storeAvailability(Request $request)
    {
        $advisor = auth()->user()->advisor;

        $validated = $request->validate([
            'type' => 'required|in:date,week,month',
            'specific_date' => 'nullable|required_if:type,date|date',
            'weekdays' => 'nullable|array',
            'weekdays.*' => 'string',
            'months' => 'nullable|required_if:type,month|array',
            'months.*' => 'string',
            'time_slots' => 'required|array|min:1',
            'time_slots.*.start' => 'required|date_format:H:i',
            'time_slots.*.end' => 'required|date_format:H:i',
        ]);

        // Manual same-day time validation
        foreach ($validated['time_slots'] as $index => $slot) {
            $start = \Carbon\Carbon::createFromFormat('H:i', $slot['start']);
            $end   = \Carbon\Carbon::createFromFormat('H:i', $slot['end']);

            if ($end->lessThanOrEqualTo($start)) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    "time_slots.$index.end" => "End time must be after start time."
                ]);
            }
        }

        $availability = ConsultationAvailability::create([
            'advisor_id' => $advisor->id,
            'type' => $validated['type'],
            'specific_date' => $validated['specific_date'] ?? null,
            'weekdays' => $validated['weekdays'] ?? null,
            'months' => $validated['months'] ?? [],
        ]);

        foreach ($validated['time_slots'] as $slot) {
            $availability->timeSlots()->create([
                'start_time' => $slot['start'],
                'end_time' => $slot['end'],
            ]);
        }

        return redirect()
            ->route('advisors.profile.show')
            ->with('status_key', 'Availability Saved Successfully');
    }

    public function updateAvailability(Request $request, $id)
    {
        $availability = ConsultationAvailability::where('advisor_id', auth()->user()->advisor->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'type' => 'required|in:date,week,month',
            'specific_date' => 'nullable|required_if:type,date|date',
            'weekdays' => 'nullable|array',
            'months' => 'nullable|array',
            'time_slots' => 'required|array|min:1',
            'time_slots.*.start' => 'required|date_format:H:i',
            'time_slots.*.end' => 'required|date_format:H:i',
        ]);

        // Manual same-day validation
        foreach ($validated['time_slots'] as $i => $slot) {
            $start = \Carbon\Carbon::createFromFormat('H:i', $slot['start']);
            $end = \Carbon\Carbon::createFromFormat('H:i', $slot['end']);

            if ($end->lessThanOrEqualTo($start)) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    "time_slots.$i.end" => "End time must be after start time."
                ]);
            }
        }

        $availability->update([
            'type' => $validated['type'],
            'specific_date' => $validated['specific_date'] ?? null,
            'weekdays' => $validated['weekdays'] ?? null,
            'months' => $validated['months'] ?? null,
        ]);

        // Replace slots
        $availability->timeSlots()->delete();
        foreach ($validated['time_slots'] as $slot) {
            $availability->timeSlots()->create($slot);
        }

        return redirect()
            ->route('advisors.profile.show')
            ->with('status_key', 'Availability Updated Successfully');
    }

    public function destroyAvailability($id)
    {
        $availability = ConsultationAvailability::where(
            'advisor_id',
            auth()->user()->advisor->id
        )->findOrFail($id);

        $availability->timeSlots()->delete();
        $availability->delete();

        return redirect()
            ->route('advisors.profile.show')
            ->with('status_key', 'Availability Deleted Successfully');
    }

}