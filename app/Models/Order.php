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

    public function rating()
    {
        return $this->hasOne(SupplierRating::class);
    }

    // Helper to get readable status
    public function getStatusLabelAttribute()
    {
        return match ($this->status) {
            'pending' => 'Pending',
            'accepted' => 'Accepted',
            'packed' => 'Packed',
            'dispatched' => 'Dispatched',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
            // Legacy statuses for backward compatibility
            'confirmed' => 'Accepted',
            'shipping' => 'Dispatched',
            default => ucfirst(str_replace('_', ' ', $this->status)),
        };
    }

    // Helper for color classes
    public function getStatusColorAttribute()
    {
        return match ($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800',
            'accepted' => 'bg-blue-100 text-blue-800',
            'packed' => 'bg-indigo-100 text-indigo-800',
            'dispatched' => 'bg-purple-100 text-purple-800',
            'out_for_delivery' => 'bg-orange-100 text-orange-800',
            'delivered' => 'bg-green-100 text-green-800',
            'cancelled' => 'bg-red-100 text-red-800',
            // Legacy statuses
            'confirmed' => 'bg-blue-100 text-blue-800',
            'shipping' => 'bg-purple-100 text-purple-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
