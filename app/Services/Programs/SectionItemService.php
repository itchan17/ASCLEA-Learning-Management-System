<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\Material;
use App\Models\Programs\SectionItem;
use Carbon\Carbon;

class SectionItemService
{
    public function getSectionItemCompleteDetails(SectionItem $sectionItem)
    {
        return $sectionItem->load([
            'item' => function ($morphTo) {
                $morphTo->morphWith([
                    // For Assessments
                    Assessment::class => [
                        'assessmentType',
                        'author:user_id,first_name,last_name',
                        'quiz:assessment_id,quiz_id,quiz_title',
                        'files:assessment_id,assessment_file_id,file_name,file_path',
                    ],

                    // For Materials
                    Material::class => [
                        'author:user_id,first_name,last_name',
                        'materialFiles:material_id,material_file_id,file_name,file_path',
                    ],
                ]);
            },
        ]);
    }
    public function createSectionItem(string $sectionId, string $itemId, $itemType)
    {
        $itemsCount  = SectionItem::where('section_id', $sectionId)->count();

        $sectionItem = SectionItem::create([
            'section_id' => $sectionId,
            'item_type' =>  $itemType,
            'item_id' => $itemId,
            'order' =>  $itemsCount + 1
        ]);

        return $this->getSectionItemCompleteDetails($sectionItem);
    }

    public function updateSectionItem(SectionItem $sectionItem)
    {
        $sectionItem->update([
            'updated_at' => Carbon::now()
        ]);

        $sectionItem->refresh();

        return $this->getSectionItemCompleteDetails($sectionItem);
    }
}
