<?php

namespace App\Services\Programs;

use App\Models\Programs\SectionItem;

class SectionItemService
{
    public function createSectionItem(string $sectionId, string $itemId, $itemType)
    {
        $itemsCount  = SectionItem::where('section_id', $sectionId)->count();

        $sectionItem = SectionItem::create([
            'section_id' => $sectionId,
            'item_type' =>  $itemType,
            'item_id' => $itemId,
            'order' =>  $itemsCount + 1
        ]);

        return $sectionItem->load('item');
    }
}
