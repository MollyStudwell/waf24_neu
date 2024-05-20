<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Database\Seeder;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $note1 = new Note();
        $note1->title ='Einkaufen';
        $note1->description = 'Äpfel, Birnen';
        $notelist1 = Notelist::find(2);
        $note1->notelist()->associate($notelist1);
        $note1->save();
        $image1 = new Image;
        $image1->title = 'img 01';
        $image1->url = 'https://picsum.photos/400/400';
        $image2 = new Image;
        $image2->title = 'img 02';
        $image2->url = 'https://picsum.photos/400/400';
        $note1->images()->saveMany([$image1, $image2]);
        $note1->save();

        $note2 = new Note();
        $note2->title ='Einkaufen';
        $note2->description = 'Mo: Hofer, Mi: DM';
        $notelist2 = Notelist::all()->first();
        $note2->notelist()->associate($notelist2);
        $note2->save();

        $note3 = new Note();
        $note3->title ='Christian abholen';
        $note3->description = 'Christian vom KH abholen , 12:00';
        $notelist3 = Notelist::all()->first();
        $note3->notelist()->associate($notelist3);
        $note3->save();
        $categories3 = Category::all()->pluck("id");
        $note3->categories()->sync($categories3);
        $note3->save();
    }
}
