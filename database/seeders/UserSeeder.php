<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Buyer User',
                'email' => 'buyer@example.com',
                'password' => bcrypt('password123'),
                'role' => 'buyer',
            ],
            [
                'name' => 'Supplier User',
                'email' => 'supplier@example.com',
                'password' => bcrypt('password123'),
                'role' => 'supplier',
            ],
            [
                'name' => 'Advisor User',
                'email' => 'advisor@example.com',
                'password' => bcrypt('password123'),
                'role' => 'advisor',
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
