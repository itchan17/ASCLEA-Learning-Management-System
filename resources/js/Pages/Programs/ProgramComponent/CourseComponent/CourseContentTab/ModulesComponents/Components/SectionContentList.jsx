import React from "react";
import SectionContent from "./SectionContent";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function SectionContentList({ sectionDetails }) {
    const itemIds = sectionDetails.items.map((item) => item.section_item_id);
    return (
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {sectionDetails.items.map((item, index) => {
                return (
                    <SectionContent
                        disabled={
                            sectionDetails.status === "published" ||
                            sectionDetails.deleted_at
                                ? true
                                : false
                        }
                        key={item.section_item_id}
                        itemDetails={item}
                        sectionId={sectionDetails.section_id}
                    />
                );
            })}
        </SortableContext>
    );
}
