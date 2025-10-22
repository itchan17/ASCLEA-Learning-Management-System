import React from "react";
import SectionContent from "./SectionContent";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function SectionContentList({ sectionContent, sectionStatus }) {
    const itemIds = sectionContent.map((item) => item.sortOrder);
    return (
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {sectionContent.map((content, index) => {
                return (
                    <SectionContent
                        disabled={sectionStatus === "published" ? true : false}
                        key={content.sortOrder}
                        contentDetails={content}
                    />
                );
            })}
        </SortableContext>
    );
}
