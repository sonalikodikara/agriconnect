<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Advisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'district',
        'province',
        'address',
        'description',
        'qualifications',
        'specialization',
        'certifications',
        'website',
        'established',
        'experience',
        'profile_image',
        'cover_image',
<<<<<<< HEAD
=======
        'available_time',
>>>>>>> AG-26
    ];

    protected $casts = [
        'specialization' => 'array',
        'certifications' => 'array',
        'established' => 'date',
<<<<<<< HEAD
=======
        'available_time' => 'array',
>>>>>>> AG-26
    ];

    protected $appends = ['profile_image_url', 'cover_image_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image
            ? asset('storage/' . $this->profile_image)
            : null;
    }

    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image
            ? asset('storage/' . $this->cover_image)
            : null;
    }
<<<<<<< HEAD

    public function consultationAvailabilities()
    {
        return $this->hasMany(\App\Models\ConsultationAvailability::class);
    }

}
=======
}
>>>>>>> AG-26
