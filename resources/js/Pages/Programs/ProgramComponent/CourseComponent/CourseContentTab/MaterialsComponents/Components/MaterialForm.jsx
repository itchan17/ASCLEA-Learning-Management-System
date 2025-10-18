import { useState, useEffect } from "react";
import TextEditor from "../../../TextEditor";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { AiFillFileAdd } from "react-icons/ai";
import useModulesStore from "../Stores/modulesStore";
import FileCard from "../../../FileCard";
import DropFiles from "../../../../../../../Components/DragNDropFiles/DropFiles";

export default function MaterialForm({
    toggleOpenMaterialForm,
    formTitle,
    formWidth,
    sectionId,
}) {
    // Materials Store
    const materialDetails = useModulesStore((state) => state.materialDetails);
    const handleMaterialChange = useModulesStore(
        (state) => state.handleMaterialChange
    );
    const handleAddMaterials = useModulesStore(
        (state) => state.handleAddMaterials
    );
    const removeAttachedFile = useModulesStore(
        (state) => state.removeAttachedFile
    );

    const [showDropFiles, setShowDropFiles] = useState(false);

    const toggleDropFiles = () => {
        setShowDropFiles(!showDropFiles);
    };

    const handleAddMaterial = () => {
        handleAddMaterials(sectionId);
        toggleOpenMaterialForm();
    };

    useEffect(() => console.log(materialDetails), [materialDetails]);

    return (
        <div
            className={`border ${formWidth} font-nunito-sans border-ascend-gray1 shadow-shadow1 p-5 space-y-5 bg-ascend-white`}
        >
            <h1 className="text-size4 font-bold">
                {formTitle || "Add Material"}
            </h1>
            <div>
                <label>
                    Material Title <span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    value={materialDetails.materialTitle}
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    onChange={(e) =>
                        handleMaterialChange("materialTitle", e.target.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <TextEditor
                    fieldName={"materialDescription"}
                    value={materialDetails.materialDescription}
                    setValue={handleMaterialChange}
                />
            </div>

            <DropFiles
                handleFileChange={handleMaterialChange}
                withCancel={false}
                fieldName={"materialFiles"}
                allowedFiles={{
                    "image/png": [".png"],
                    "image/jpeg": [".jpeg", ".jpg"],
                    "application/pdf": [".pdf"],
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                        [".pptx"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                }}
            />

            {/* Attached Files */}
            {materialDetails.materialFiles?.length > 0 && (
                <div>
                    <div>
                        <label className="font-bold pb-5">Attached Files</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {materialDetails.materialFiles.map((file, index) => {
                            return (
                                <div key={index}>
                                    <FileCard
                                        removeAttachedFile={removeAttachedFile}
                                        fileId={index}
                                        fileName={file.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-5 items-center justify-end">
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
