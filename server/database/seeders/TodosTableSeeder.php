<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Notelist;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $todo1 = new Todo();
        $todo1->title = 'Trainieren gehen';
        $todo1->description = 'Im Lionfit Hgb';
        $todo1->due_date = new \DateTime('2024-05-21');
        $todo1->visibility = false;
        $todo1->completed = false;
        $notelist1 = Notelist::all()->first();
        $todo1->notelist()->associate($notelist1);
        $note1 = Note::all()->first();
        $todo1->note()->associate($note1);
        $user1 = User::all()->first();
        $todo1->responsible_person()->associate($user1);
        $user2 = User::all()->first();
        $todo1->creator()->associate($user2);
        $todo1->save();

        $todo2 = new Todo();
        $todo2->title = 'Einkaufen';
        $todo2->description = 'Hofer und DM';
        $todo2->due_date = new \DateTime('2024-05-29');
        $todo2->visibility = false;
        $todo2->completed = false;
        $notelist2 = Notelist::all()->first();
        $todo2->notelist()->associate($notelist2);
        /*$note2 = Note::all()->first();
        $todo2->note()->associate($note2);*/
        $user3 = User::all()->first();
        $todo2->responsible_person()->associate($user3);
        $user2 = User::all()->first();
        $todo2->creator()->associate($user2);
        $todo2->save();
    }
}
