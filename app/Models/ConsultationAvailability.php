<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultationAvailability extends Model
{
    protected $fillable = [
        'advisor_id',
        'type',
        'specific_date',
        'weekdays',
        'months',
    ];

    protected $casts = [
        'weekdays' => 'array',
        'months' => 'array',
    ];

    public function timeSlots()
    {
        return $this->hasMany(ConsultationTimeSlot::class);
    }
}
