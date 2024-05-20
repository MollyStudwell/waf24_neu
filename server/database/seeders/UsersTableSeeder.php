<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = new User();
        $user1->firstname = 'Leonhard';
        $user1->lastname = 'Berger';
        $user1->email = 'lenni.berger@gmail.com';
        $user1->password = 'leoberger1234';
        $user1->picture = 'https://picsum.photos/400/400';
        $user1->save();

        $user2 = new User();
        $user2->firstname = 'Molly';
        $user2->lastname = 'Studwell';
        $user2->email = 'mollystudwell@gmx.at';
        $user2->password = '1234abc';
        $user2->picture = 'https://picsum.photos/id/237/200/300';
        $user2->save();

        $user3 = new User();
        $user3->firstname = 'Frank';
        $user3->lastname = 'Weber';
        $user3->email = 'frank.weber@gmail.com';
        $user3->password = 'frank123';
        $user3->picture = 'https://picsum.photos/seed/picsum/200/300';
        $user3->save();
    }
}
