<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultationTimeSlot extends Model
{
    protected $fillable = [
        'consultation_availability_id',
        'start_time',
        'end_time',
    ];
}