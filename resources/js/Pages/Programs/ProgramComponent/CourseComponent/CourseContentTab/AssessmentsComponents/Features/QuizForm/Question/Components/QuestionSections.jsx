import { DndContext, closestCorners } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import QuestionList from "./QuestionList";

function QuestionSection({
    sensors,
    handleDragEnd,
    questionList,
    itemIds,
    questionDetails,
    onEdit,
    targetForm,
}) {
    return (
        questionList.length > 0 && (
            <div className="space-y-5">
                <h1 className="font-bold">Questions:</h1>
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <QuestionList
                        questionList={questionList}
                        itemIds={itemIds}
                        questionDetails={questionDetails}
                        onEdit={onEdit}
                        targetForm={targetForm}
                    />
                </DndContext>
            </div>
        )
    );
}

export default QuestionSection;
