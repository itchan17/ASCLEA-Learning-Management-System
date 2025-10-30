import React from "react";
import SectionContent from "./SectionContent";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function SectionContentList({ sectionDetails }) {
    const itemIds = sectionDetails.items.map((item) => item.order);
    return (
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {sectionDetails.items.map((content, index) => {
                return (
                    <SectionContent
                        disabled={
                            sectionDetails.status === "published" ? true : false
                        }
                        key={content.section_item_id}
                        contentDetails={content}
                        sectionId={sectionDetails.section_id}
                    />
                );
            })}
        </SortableContext>
    );
}
