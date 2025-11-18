import React from "react";
import { createPortal } from "react-dom";
import SecondaryButton from "./Button/SecondaryButton";
import PrimaryButton from "./Button/PrimaryButton";

export default function AlertModal({
    title,
    description = null,
    closeModal,
    onConfirm,
    nested = false,
    isLoading,
    customBody,
}) {
    const overlay = (
        <div
            onClick={closeModal}
            className={`fixed inset-0 h-screen ${
                nested ? "bg-black/50" : "bg-black/25"
            } z-200 grid place-items-center`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-160 bg-ascend-white font-nunito-sans space-y-5"
            >
                <div className="px-5 py-2 bg-ascend-blue">
                    <h1 className="text-ascend-white text-size3 font-semibold">
                        {title}
                    </h1>
                </div>
                <div className="space-y-5 px-5 pb-5">
                    {description ? (
                        <p className="text-size3 text-ascend-black">
                            {description}
                        </p>
                    ) : (
                        customBody
                    )}

                    <div className="flex gap-2 justify-end">
                        <PrimaryButton
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            doSomething={onConfirm || closeModal}
                            text={"Done"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}
