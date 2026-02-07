<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id', 'name', 'brand', 'category', 'quality', 'price', 'quantity',
        'quantity_unit', 'description', 'minimum_order', 'packaging_size',
        'npk', 'other_nutrition', 'ingredients', 'micronutrients',
        'manufacturing_details', 'soil_type', 'instructions', 'safety_storage',
        'primary_image', 'optional_images', 'certificates',
    ];

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
    ];

    // Always include image URLs
    protected $appends = [
        'primary_image_url',
        'optional_images_urls',
        'certificates_urls',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function getPrimaryImageUrlAttribute()
    {
        return $this->primary_image
            ? asset('storage/' . $this->primary_image)
            : '/placeholder.jpg'; // fallback
    }

    public function getOptionalImagesUrlsAttribute()
    {
        if (!$this->optional_images || !is_array($this->optional_images)) {
            return [];
        }

        return array_map(fn($path) => asset('storage/' . $path), $this->optional_images);
    }

    public function getCertificatesUrlsAttribute()
    {
        if (!$this->certificates || !is_array($this->certificates)) {
            return [];
        }

        return array_map(fn($path) => asset('storage/' . $path), $this->certificates);
    }
}