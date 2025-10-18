import { useState, useEffect } from "react";
import TextEditor from "../../../TextEditor";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { AiFillFileAdd } from "react-icons/ai";
import useModulesStore from "../Stores/modulesStore";
import FileCard from "../../../FileCard";
import DropFiles from "../../../../../../../Components/DragNDropFiles/DropFiles";
import useMaterialForm from "../Hooks/useMaterialForm";
import { usePage } from "@inertiajs/react";
import { IoCaretDownOutline } from "react-icons/io5";
import { closeDropDown } from "../../../../../../../Utils/closeDropdown";

export default function MaterialForm({
    toggleOpenMaterialForm,
    formTitle,
    formWidth,
    sectionId,
    setIsMaterialFormOpen,
}) {
    const { program, course } = usePage().props;

    // Custom hooks
    const {
        materialDetails,
        handleMaterialDetailsChange,
        handleRemoveAttachedFiles,
        handleAddMaterial,
        errors,
        isLoading,
    } = useMaterialForm({
        programId: program.program_id,
        courseId: course.course_id,
    });

    const handleCLickDropDown = (value) => {
        handleMaterialDetailsChange("status", value);
        closeDropDown();
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
                    value={materialDetails.material_title}
                    className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                        errors && errors.material_title
                            ? "border-2 border-ascend-red"
                            : ""
                    }`}
                    onChange={(e) =>
                        handleMaterialDetailsChange(
                            "material_title",
                            e.target.value
                        )
                    }
                />

                {errors && errors.material_title && (
                    <span className="text-ascend-red">
                        {errors.material_title}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor="">Description</label>
                <TextEditor
                    fieldName={"material_description"}
                    value={materialDetails.material_description}
                    setValue={handleMaterialDetailsChange}
                />
            </div>

            <DropFiles
                handleFileChange={handleMaterialDetailsChange}
                disabled={isLoading}
                withCancel={false}
                fieldName={"material_files"}
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
            {materialDetails.material_files?.length > 0 && (
                <div>
                    <div>
                        <label className="font-bold pb-5">Attached Files</label>
                    </div>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ${
                            errors &&
                            Object.entries(errors).some(([key, message]) =>
                                key.startsWith("material_files")
                            )
                                ? "p-2 border-2 border-ascend-red"
                                : ""
                        }`}
                    >
                        {/* List the attached files */}
                        {materialDetails.material_files.map((file, index) => {
                            return (
                                <div key={index}>
                                    <FileCard
                                        removeAttachedFile={() =>
                                            handleRemoveAttachedFiles(index)
                                        }
                                        fileId={index}
                                        fileName={file.name}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* List all the error that start with material_files */}
                    {errors && (
                        <div className="flex flex-col">
                            {Object.entries(errors).map(([key, message]) => {
                                if (key.startsWith("material_files")) {
                                    return (
                                        <span className="text-ascend-red">
                                            {message}
                                        </span>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-5 items-center justify-end">
                <div className="flex flex-wrap justify-end gap-2">
                    <SecondaryButton
                        doSomething={toggleOpenMaterialForm}
                        isDisabled={isLoading}
                        text={"Cancel"}
                    />

                    <div className="flex space-x-[0.5px]">
                        <PrimaryButton
                            doSomething={() =>
                                handleAddMaterial(setIsMaterialFormOpen)
                            }
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            text={
                                materialDetails.status === "published"
                                    ? "Publish"
                                    : "Save as draft"
                            }
                        />

                        {/* Dropdown button */}
                        <div className="dropdown dropdown-end cursor-pointer ">
                            <button
                                tabIndex={0}
                                role="button"
                                className="px-3 h-10 bg-ascend-blue hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                            >
                                <div className="text-size1 ">
                                    {<IoCaretDownOutline />}
                                </div>
                            </button>

                            <ul
                                tabIndex={0}
                                className="text-size2 dropdown-content menu space-y-2 font-medium bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                            >
                                <li
                                    onClick={() =>
                                        handleCLickDropDown("published")
                                    }
                                >
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Publish
                                    </a>
                                </li>
                                <li
                                    onClick={() => handleCLickDropDown("draft")}
                                >
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Save as drat
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
