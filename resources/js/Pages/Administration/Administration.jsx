import { useMemo, useState, useEffect } from "react";
import EmptyState from "../../Components/EmptyState/EmptyState";
import useAdministrationStore from "../../Stores/Administration/administrationStore";
import { IoSearch } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";
import AddStaffForm from "./AdministrationComponents/AddStaffForm";
import { usePage, router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import Pagination from "@/Components/Pagination";
import { debounce } from "lodash";

export default function Administration() {
    const route = useRoute();
    const { props } = usePage();
    const { staffs } = props;

    const [openAddStaff, setOpenAddStaff] = useState(false);

    const toggleAddStaff = () => {
        setOpenAddStaff(!openAddStaff);
    };

    const handleStaffClick = (userId) => {
        console.log(userId);
        router.visit(route("administration.view", userId));
    };

    const [search, setSearch] = useState(props.filters?.search || "");
    const [initialRender, setInitialRender] = useState(true);

    // Update search state
    const handleSearch = (value) => {
        setSearch(value);
        setInitialRender(false);
    };

    const debounceHandleSearch = useMemo(() => {
        return debounce(handleSearch, 300); 
    }, []);

    useEffect(() => {
        return () => debounceHandleSearch.cancel(); 
    }, []);

    useEffect(() => {
        if (!initialRender) {
            const query = {};
            if (search.trim()) query.search = search.trim();

            router.get(
                route("administration.index"),
                query,
                { preserveState: true, replace: true }
            );
        }
    }, [search]);

    const handlePageClick = (page) => {
    router.get(
        route("administration.index", { page }),
        { search },
        { preserveState: true, replace: true }
    );
    };

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="flex flex-wrap gap-5 justify-between items-center">
                <h1 className="text-size6 font-bold">Manage Staff</h1>
                <PrimaryButton
                    doSomething={toggleAddStaff}
                    text={"Add Staff"}
                />
            </div>
            <div className="flex justify-end items-center">
                {/*<BiFilter className="text-size5 shrink-0" />
                <div className="font-bold text-size2 pr-10">Filter</div>*/}
                <div className="relative">
                    <input
                        className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search name"
                        defaultValue={search}
                        onChange={(e) => debounceHandleSearch(e.target.value)}
                    />
                    <IoSearch 
                    onClick={() => handleSearch(search)}
                    className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                Email
                            </th>
                            <th className="text-ascend-black font-black">
                                Role
                            </th>
                            <th className="text-ascend-black font-black">
                                Status
                            </th>
                            <th className="text-ascend-black font-black">
                                Last login
                            </th>
                            {/*<th className="text-ascend-black font-black">
                                Last Logout
                            </th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.data && staffs.data.length > 0 ? (
                            staffs.data.map((staff) => (
                                <tr
                                    key={staff.staff_id}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                    onClick={() => handleStaffClick(staff.staff_id)}
                                >
                                    <td>
                                    {staff.user
                                        ? `${staff.user.first_name} ${staff.user.middle_name || ""} ${staff.user.last_name}`.trim()
                                        : "N/A"}
                                    </td>
                                    <td>{staff.user.email || "N/A"}</td>
                                    <td>{staff.user?.role?.role_name || "N/A"}</td>
                                    <td>{staff.status || "N/A"}</td>
                                    <td>
                                    {staff.user?.last_login?.login_at
                                        ? new Date(staff.user.last_login.login_at).toLocaleDateString("en-US") : "N/A"}
                                    </td>
                                    {/*<td>{staff.user?.last_logout?.logout_at || "N/A"}</td>*/}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    <EmptyState
                                        paddingY="py-0"
                                        imgSrc="/images/illustrations/grades.svg"
                                        text="No staff members yet. Click 'Add Staff' to get started!"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {staffs?.links && (
                <Pagination
                    links={staffs.links}
                    currentPage={staffs.current_page}
                    lastPage={staffs.last_page}
                    only={["staffs"]}
            />)}
            <div className="flex space-x-[0.5px]">
                <PrimaryButton text="Download" />

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
                        className="text-size2 dropdown-content menu space-y-2 font-bold bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                    >
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Download as pdf
                            </a>
                        </li>
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Download as csv
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Open add staff form */}
            {openAddStaff && <AddStaffForm toggleForm={toggleAddStaff} />}
        </div>
    );
}
