<?php

namespace Database\Seeders;

use App\Models\Notelist;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notelist = new Notelist();
        $notelist->name = 'Leonhards Notizbuch';
        $notelist->visibility = false;
        $user1 = User::all()->first();
        $notelist->creator()->associate($user1);
        $notelist->save();

        $notelist1 = new Notelist();
        $notelist1->name = 'Mollys Notizbuch';
        $notelist1->visibility = false;
        $user2 = User::where('firstname', 'Frank')->first();
        $notelist1->creator()->associate($user2);
        $notelist1->save();

        $notelist2 = new Notelist();
        $notelist2->name = 'Franks Notizbuch';
        $notelist2->visibility = false;
        $user3 = User::all()->first();
        $notelist2->creator()->associate($user3);
        $notelist2->save();
    }
}
