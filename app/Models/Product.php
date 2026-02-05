<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'for_rent'        => 'boolean',
        'is_modern'       => 'boolean',
        'rental_price_per_day' => 'decimal:2',
        'year'            => 'integer',
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
        if (!$this->primary_image) {
            return null;
        }

        return Storage::disk('public')->url($this->primary_image);
    }

    public function getOptionalImagesUrlsAttribute()
    {
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
