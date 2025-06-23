import React from "react";
import SectionContent from "./SectionContent";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function SectionContentList({ sectionContent }) {
    return (
        <div className="space-y-3">
            <SortableContext
                items={sectionContent}
                strategy={verticalListSortingStrategy}
            >
                {sectionContent.map((content, index) => {
                    return (
                        <SectionContent
                            disabled={false}
                            key={index}
                            contentDetails={content}
                        />
                    );
                })}
            </SortableContext>
        </div>
    );
}
