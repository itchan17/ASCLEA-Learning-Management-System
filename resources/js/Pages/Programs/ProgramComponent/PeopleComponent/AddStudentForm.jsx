import { useEffect, useState, useRef, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import usePeopleStore from "../../../../Stores/Programs/peopleStore";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import Loader from "../../../../Components/Loader";
import { capitalize } from "lodash";

export default function AddStudentForm({ toggleModal }) {
    // People Store
    const handleAddPeopleChange = usePeopleStore(
        (state) => state.handleAddPeopleChange
    );
    const clearNewPeople = usePeopleStore((state) => state.clearNewPeople);
    const handleAddPeople = usePeopleStore((state) => state.handleAddPeople);

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [userList, setUserList] = useState([]);

    const loaderRef = useRef(null);

    const { program } = usePage().props;

    const fetchUserList = async () => {
        setIsLoading(true);
        if (isLoading || !hasMore) return;

        try {
            const res = await axios.get(
                route("program.list.users", [program.program_id, { page }])
            );
            setUserList((prev) => [...prev, ...res.data.data]);
            setIsLoading(false);
            setHasMore(res.data.current_page < res.data.last_page);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting) fetchUserList();
        },
        [isLoading, hasMore]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "200px",
            threshold: 0,
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [handleObserver]);

    const handleAdd = (e) => {
        e.preventDefault();
        handleAddPeople();
        toggleModal();
    };

    const handleCancel = () => {
        clearNewPeople();
        toggleModal();
    };
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center text-ascend-black">
            <form
                onSubmit={(e) => handleAdd(e)}
                className="bg-ascend-white opacity-100 p-5 w-160 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">Add Student</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="relative col-span-1 sm:col-span-2">
                        <input
                            className="border w-full pl-10 pr-3 py-2 border-ascend-black focus:outline-ascend-blue"
                            type="text"
                            placeholder="Search by typing name or email"
                        />
                        <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                    </div>
                    <select
                        className={`textField border w-full px-3 py-2  focus:outline-ascend-blue`}
                    >
                        <option value="">All</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                </div>
                <div className="h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                    {userList.length > 0 &&
                        userList.map((user) => (
                            <div
                                key={user.user_id}
                                className="w-full flex items-center py-5"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-ascend-blue w-4 h-4"
                                    // onChange={() => handleAddPeopleChange(user)}
                                />
                                <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl ml-5 mr-3"></div>
                                <div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {`${user.first_name} ${user.last_name}`}
                                        </span>
                                        <span className="text-size1 -mt-1">
                                            {capitalize(user.role.role_name)}
                                        </span>
                                    </div>
                                    <span className="text-size1">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        ))}

                    {hasMore && (
                        <div
                            ref={loaderRef}
                            className={`flex items-center   ${
                                userList.length > 0 ? "py-5" : "min-h-full"
                            }`}
                        >
                            <Loader color="bg-ascend-blue" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={handleCancel}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        doSomething={(e) => handleAdd(e)}
                        btnType={"submit"}
                        text={"Add"}
                    />
                </div>
            </form>
        </div>
    );
}
