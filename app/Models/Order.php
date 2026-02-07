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
<<<<<<< HEAD
        'payment_method',
        'delivery_name',
        'delivery_phone',
        'delivery_address',
        'card_expiry',
=======
        'delivery_address',
        'delivery_phone',
        'delivery_name',
>>>>>>> AG-26
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
<<<<<<< HEAD
        'card_expiry' => 'date',
=======
>>>>>>> AG-26
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

<<<<<<< HEAD
=======
    public function rating()
    {
        return $this->hasOne(SupplierRating::class);
    }

>>>>>>> AG-26
    // Helper to get readable status
    public function getStatusLabelAttribute()
    {
        return match ($this->status) {
<<<<<<< HEAD
            'pending' => 'Pending Payment',
            'confirmed' => 'Confirmed',
            'shipping' => 'Shipping',
            'delivered' => 'Delivered',
            default => ucfirst($this->status),
=======
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
>>>>>>> AG-26
        };
    }

    // Helper for color classes
    public function getStatusColorAttribute()
    {
        return match ($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800',
<<<<<<< HEAD
            'confirmed' => 'bg-blue-100 text-blue-800',
            'shipping' => 'bg-purple-100 text-purple-800',
            'delivered' => 'bg-green-100 text-green-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
=======
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
>>>>>>> AG-26
}
