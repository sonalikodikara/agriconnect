<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Supplier;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // database/factories/ProductFactory.php
    public function definition()
    {
        return [
            'supplier_id' => Supplier::factory(),
            'name' => $this->faker->words(3, true) . ' Fertilizer',
            'brand' => $this->faker->company,
            'category' => $this->faker->randomElement(['Fertilizer', 'Pesticide', 'Seed', 'Equipment', 'Feed']),
            'price' => $this->faker->randomFloat(2, 500, 10000),
            'quantity' => $this->faker->randomFloat(2, 10, 1000),
            'quantity_unit' => $this->faker->randomElement(['kg', 'l', 'tons', 'packets']),
            'description' => $this->faker->paragraph,
            'minimum_order' => $this->faker->numberBetween(1, 50),
        ];
    }
}
