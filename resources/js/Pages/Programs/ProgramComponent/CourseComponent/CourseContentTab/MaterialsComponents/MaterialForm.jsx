import { useState } from "react";
import TextEditor from "../../TextEditor";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import { AiFillFileAdd } from "react-icons/ai";
import useMaterialsStore from "../../../../../../Stores/Programs/CourseContent/materialsStore";
import MaterialFileCard from "./MaterialFileCard";
import DropFiles from "./DropFiles";

export default function MaterialForm({ toggleOpenMaterialForm }) {
    // Materials Store
    const fileList = useMaterialsStore((state) => state.fileList);
    const materialDetails = useMaterialsStore((state) => state.materialDetails);
    const handleMaterialTitleChange = useMaterialsStore(
        (state) => state.handleMaterialTitleChange
    );
    const materialTextEditorValue = useMaterialsStore(
        (state) => state.materialTextEditorValue
    );
    const handleMaterialTextEditorValue = useMaterialsStore(
        (state) => state.handleMaterialTextEditorValue
    );
    const hanndleAddMaterials = useMaterialsStore(
        (state) => state.hanndleAddMaterials
    );

    const [showDropFiles, setShowDropFiles] = useState(false);

    const toggleDropFiles = () => {
        setShowDropFiles(!showDropFiles);
    };

    const handleAddMaterial = () => {
        hanndleAddMaterials();
        toggleOpenMaterialForm();
    };
    return (
        <div className="border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={materialDetails.materialTitle}
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    onChange={(e) =>
                        handleMaterialTitleChange(
                            "materialTitle",
                            e.target.value
                        )
                    }
                />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <TextEditor
                    value={materialTextEditorValue}
                    setValue={handleMaterialTextEditorValue}
                />
            </div>

            {showDropFiles && <DropFiles toggleDropFiles={toggleDropFiles} />}

            {/* Attached Files */}
            {fileList?.length > 0 && (
                <>
                    <div>
                        <label className="font-bold pb-5">Attached Files</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {fileList.map((file, index) => {
                            return (
                                <div key={index}>
                                    <MaterialFileCard
                                        fileId={index}
                                        fileName={file.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            <div className="flex items-center justify-between">
                <SecondaryButton
                    isDisabled={showDropFiles}
                    doSomething={toggleDropFiles}
                    icon={<AiFillFileAdd />}
                    text={"Add Files"}
                />
                <div className="flex flex-wrap justify-end gap-2">
                    <SecondaryButton
                        doSomething={toggleOpenMaterialForm}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        doSomething={handleAddMaterial}
                        text={"Add"}
                    />
                </div>
            </div>
        </div>
    );
}
