import React from "react";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import ModalContainer from "../../../Components/ModalContainer";
import { router, useForm } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { displayToast } from "../../../Utils/displayToast";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";

export default function AddStaffForm({ toggleForm }) {
    const route = useRoute();
    const [emailError, setEmailError] = React.useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        role_name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailError) return;

        post(route("staff.store"), {
            showProgress: false,
            onSuccess: (page) => {
                reset();
                toggleForm();
                displayToast(
                    <DefaultCustomToast message={page.props.flash.success} />,
                    "success"
                );
            },
        });
    };

    return (
        <ModalContainer>
            <form onSubmit={handleSubmit} className="bg-ascend-white opacity-100 p-5 w-112 space-y-5">
                <h1 className="text-size4 font-bold">Create Staff Account</h1>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        First Name <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        className="border px-3 py-2 border-ascend-gray1 focus:outline-ascend-blue"
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Last Name <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        className="border px-3 py-2 border-ascend-gray1 focus:outline-ascend-blue"
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        value={data.middle_name}
                        onChange={(e) => setData("middle_name", e.target.value)}
                        className="border px-3 py-2 border-ascend-gray1 focus:outline-ascend-blue"
                    />
                    {errors.middle_name && <span className="text-red-500 text-sm">{errors.middle_name}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Email <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setData("email", value);
                            
                            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,10}$/.test(value)) {
                                setEmailError("Please enter a valid email address");
                            } else {
                                setEmailError("");
                            }
                        }}
                        className="border px-3 py-2 border-ascend-gray1 focus:outline-ascend-blue"
                    />
                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="font-nunito-sans text-size2 text-ascend-black">
                        Role <span className="text-ascend-red">*</span>
                    </label>
                    <select
                        value={data.role_name}
                        onChange={(e) => setData("role_name", e.target.value)}
                        className="textField border px-3 py-2 border-ascend-gray1 focus:outline-ascend-blue"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Administrator</option>
                        <option value="faculty">Faculty</option>
                    </select>
                    {errors.role_name && <span className="text-red-500 text-sm">{errors.role_name}</span>}
                </div>

                <div className="flex justify-end gap-2">
                    <SecondaryButton text="Cancel" doSomething={toggleForm} />
                    <PrimaryButton
                        isDisabled={processing}
                        isLoading={processing}
                        text={processing ? "Creating..." : "Create"}
                        doSomething={handleSubmit}
                    />
                </div>
            </form>
        </ModalContainer>
    );
}
