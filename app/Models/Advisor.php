<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Advisor extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];

    protected $casts = [
        'specialization' => 'array',
        'certifications' => 'array',
        'established' => 'date',
    ];
}
