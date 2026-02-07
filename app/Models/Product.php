<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
<<<<<<< HEAD
        'supplier_id',
        'product_type',
        'name',
        'brand',
        'category',
        'quality',
        'price',
        'quantity',
        'quantity_unit',
        'description',
        'minimum_order',
        'packaging_size',
        'npk',
        'other_nutrition',
        'ingredients',
        'micronutrients',
        'manufacturing_details',
        'soil_type',
        'instructions',
        'safety_storage',
        'primary_image',
        'optional_images',
        'certificates',
        // Vehicle
        'vehicle_type',
        'brand_model',
        'year',
        'engine_power_hp',
        'condition',
        'for_rent',
        'rental_price_per_day',
        'vehicle_features',
        // Tool
        'tool_type',
        'tool_name',
        'power_source',
        'working_width',
        'is_modern',
        'tool_features',
        
        // PRODUCT TYPE
        'product_type',
=======
        'supplier_id', 'name', 'brand', 'category', 'quality', 'price', 'quantity',
        'quantity_unit', 'description', 'minimum_order', 'packaging_size',
        'npk', 'other_nutrition', 'ingredients', 'micronutrients',
        'manufacturing_details', 'soil_type', 'instructions', 'safety_storage',
        'primary_image', 'optional_images', 'certificates',
>>>>>>> AG-26
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
<<<<<<< HEAD
        'for_rent'        => 'boolean',
        'is_modern'       => 'boolean',
        'rental_price_per_day' => 'decimal:2',
        'year'            => 'integer',
=======
>>>>>>> AG-26
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
<<<<<<< HEAD
        if (!$this->primary_image) {
            return null;
        }

        return Storage::disk('public')->url($this->primary_image);
=======
        return $this->primary_image
            ? asset('storage/' . $this->primary_image)
            : '/placeholder.jpg'; // fallback
>>>>>>> AG-26
    }

    public function getOptionalImagesUrlsAttribute()
    {
<<<<<<< HEAD
        if (!$this->optional_images) {
            return [];
        }

        return collect($this->optional_images)->map(function ($path) {
            return Storage::disk('public')->url($path);
        });
    }

     public function getCertificatesUrlsAttribute()
    {
        if (!$this->certificates) {
            return [];
        }

        return collect($this->certificates)->map(function ($path) {
            return Storage::disk('public')->url($path);
        });
    }
}
=======
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
>>>>>>> AG-26
