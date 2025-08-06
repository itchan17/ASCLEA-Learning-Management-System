import { useMemo, useEffect, useState } from "react";
import EmptyState from "../../../../Components/EmptyState/EmptyState";
import usePeopleStore from "../../../../Stores/Programs/peopleStore";
import { router } from "@inertiajs/react";
import CustomSelect from "../../../../Components/CustomInputField/CustomSelect";
import { IoSearch } from "react-icons/io5";
import { route } from "ziggy-js";
import RoleGuard from "../../../../Components/Auth/RoleGuard";
import { usePage } from "@inertiajs/react";
import _ from "lodash";
import Pagination from "../../../../Components/Pagination";
import { debounce } from "lodash";

export default function PeopleTable() {
    const { members, program } = usePage().props;
    console.log(members);
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);

    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [initialRender, setInitialRender] = useState(true);

    const handleFilterChange = (role) => {
        setFilter(role);
        setInitialRender(false);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
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
            console.log("GET MEMBERS");
            const query = {};

            if (filter) query.role = filter;
            if (search.trim()) query.search = search.trim();

            router.get(
                route("program.show", {
                    program: program.program_id,
                    _query: query,
                }),
                {},
                {
                    showProgress: false,
                    preserveScroll: true,
                    preserveState: true,
                    only: ["members"],
                }
            );
        }
    }, [filter, search]);

    const handleMemberClick = (userId) => {
        router.visit(route("program.user.view", { programId: 1, userId }));
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-end gap-2">
                <select
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className={`textField border w-full sm:w-40 px-3 py-2  focus:outline-ascend-blue`}
                >
                    <option value="">All</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <div className="relative">
                    <input
                        className="border w-full sm:w-60 pl-10 pr-3 py-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search"
                        onChange={debounceHandleSearch}
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {members.data && members.data.length > 0 && (
                        <>
                            <tbody>
                                {members.data.map((member) => (
                                    <tr
                                        key={member.user.user_id}
                                        onClick={() =>
                                            handleMemberClick(
                                                member.user.user_id
                                            )
                                        }
                                        className="hover:bg-ascend-lightblue cursor-pointer"
                                    >
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl"></div>

                                                <div className="font-bold">
                                                    {`${member.user.first_name} ${member.user.last_name}`}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {_.capitalize(
                                                member.user.role.role_name
                                            )}
                                        </td>
                                        <td>{member.user.email}</td>
                                        <RoleGuard allowedRoles={["admin"]}>
                                            <td>
                                                <span className="text-ascend-red underline">
                                                    Remove
                                                </span>
                                            </td>
                                        </RoleGuard>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </table>
                {members.data.length > 0 && members.total > 10 && (
                    <Pagination
                        links={members.links}
                        currentPage={members.current_page}
                        lastPage={members.last_page}
                        only={["members"]}
                    />
                )}
                {members.data && members.data.length === 0 && (
                    <EmptyState
                        paddingY="py-0"
                        imgSrc={"/images/illustrations/alone.svg"}
                        text={`“It’s a bit lonely here... Add some people and let the learning begin!”`}
                    />
                )}
            </div>
        </div>
    );
}
