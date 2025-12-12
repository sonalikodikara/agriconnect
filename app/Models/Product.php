<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'supplier_id',
        'name',
        'brand',
        'category',
        'quality',
        'price',
        'quantity',
        'quantity_unit',        // kg, l, tons, etc.
        'description',
        'minimum_order',
        'packaging_size',

        // Nutritional / Composition (for fertilizers, pesticides, seeds, etc.)
        'npk',                  // JSON: { "nitrogen": "", "phosphorous": "", "potassium": "" }
        'other_nutrition',      // JSON: { "organicMatter": "", "moisture": "", "ph": "" }
        'ingredients',          // JSON array
        'micronutrients',       // JSON array

        // Advanced info
        'manufacturing_details',
        'soil_type',
        'instructions',
        'safety_storage',

        // Media
        'primary_image',
        'optional_images',      // JSON array of paths
        'certificates',         // JSON array of paths
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'price'           => 'decimal:2',
        'quantity'        => 'decimal:2',
        'minimum_order'   => 'integer',
        'npk'             => 'array',
        'other_nutrition' => 'array',
        'ingredients'     => 'array',
        'micronutrients'  => 'array',
        'optional_images' => 'array',
        'certificates'    => 'array',
        'created_at'      => 'datetime',
        'updated_at'      => 'datetime',
    ];

    /**
     * Relationship: Product belongs to a Supplier
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Accessor: Full URL for primary image
     */
    public function getPrimaryImageUrlAttribute()
    {
        return $this->primary_image
            ? Storage::disk('public')->url($this->primary_image)
            : null;
    }

    /**
     * Accessor: Array of full URLs for optional images
     */
    public function getOptionalImagesUrlsAttribute()
    {
        if (!$this->optional_images || !is_array($this->optional_images)) {
            return [];
        }

        return array_map(function ($path) {
            return Storage::disk('public')->url($path);
        }, $this->optional_images);
    }

    /**
     * Accessor: Array of full URLs for certificates / test reports
     */
    public function getCertificatesUrlsAttribute()
    {
        if (!$this->certificates || !is_array($this->certificates)) {
            return [];
        }

        return array_map(function ($path) {
            return Storage::disk('public')->url($path);
        }, $this->certificates);
    }

    /**
     * Scope: Only published/active products (you can add a status column later if needed)
     */
    public function scopeActive($query)
    {
        return $query; // placeholder – add status column if you want soft publishing
    }
}