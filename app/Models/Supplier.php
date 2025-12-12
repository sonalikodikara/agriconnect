<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'contact_person',
        'email',
        'phone',
        'address',
        'district',
        'province',
        'description',
        'website',
        'established',
        'experience',
        'specialization',
        'certifications',
        'profile_image',
        'cover_image',
        'verified',
        'rating',
        'review_count',
    ];

    protected $casts = [
        'specialization' => 'array',
        'certifications' => 'array',
        'verified' => 'boolean',
        'rating' => 'decimal:2',
    ];

    // Relationship with user
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    // Relationship with products (assuming products table with supplier_id)
    public function products()
    {
        return $this->hasMany(Product::class); // Replace Product with actual model
    }

    // Returns public url for profile image (or null)
    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image ? Storage::disk('public')->url($this->profile_image) : null;
    }

    // Returns public url for cover image (or null)
    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null;
    }
}