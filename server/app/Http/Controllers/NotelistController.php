<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotelistController extends Controller
{
    public function index(): JsonResponse
    {
        $notelists = Notelist::with(['creator'])
            ->where('creator_id',auth()->id())
            ->orWhereHas('user', function ($query) {
                $query->where('id',auth()->id());
            })
            ->get();
        return response()->json($notelists,200);
    }

    public function findByID(string $id):JsonResponse
    {
        $notelist = Notelist::where('id',$id)->with(['creator','notes','user'])->get()->first();
        return $notelist!=null ? response()->json($notelist,200) : response()->json(null, 200);
    }

    public function save(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::create($request->all());
            DB::commit();
            return response()->json($notelist, 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving notelist failed " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::with('creator','user')->
            where('id',$id)->first();
            if($notelist != null){
                $notelist->update($request->all());
                if($notelist->visibility) {
                    $creator_ids = [];
                    if(isset($request['user']) && is_array($request['user'])) {
                        foreach ($request['user'] as $use) {
                            array_push($creator_ids, $use['id']);
                        }
                    }
                    $notelist->user()->sync($creator_ids);
                } else {
                    $notelist->user()->delete();
                }
                $notelist->save();
            }
            DB::commit();
            $notelist1 = Notelist::with('creator','user')->
            where('id',$id)->first();
            return response()->json($notelist1, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating notelist failed " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse{
        $notelist = Notelist::where('id',$id)->first();
        if($notelist!=null){
            $notelist->delete();
            return response()->json('notelist ('.$id.') successfully deleted', 200);
        }else{
            return response()->json("could not delete note - it does not exist",422);
        }
    }
}
