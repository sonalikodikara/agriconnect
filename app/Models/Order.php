<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'supplier_id',
        'total_amount',
        'status',
        'delivery_address',
        'delivery_phone',
        'delivery_name',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Helper to get readable status
    public function getStatusLabelAttribute()
    {
        return match ($this->status) {
            'pending' => 'Pending Payment',
            'confirmed' => 'Confirmed',
            'shipping' => 'Shipping',
            'delivered' => 'Delivered',
            default => ucfirst($this->status),
        };
    }

    // Helper for color classes
    public function getStatusColorAttribute()
    {
        return match ($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800',
            'confirmed' => 'bg-blue-100 text-blue-800',
            'shipping' => 'bg-purple-100 text-purple-800',
            'delivered' => 'bg-green-100 text-green-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}