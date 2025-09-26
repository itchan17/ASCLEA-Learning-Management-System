import React from "react";

export default function ModalContainer({ children }) {
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex justify-center overflow-y-auto h-screen">
            <div className="my-auto py-5">{children}</div>
        </div>
    );
}
