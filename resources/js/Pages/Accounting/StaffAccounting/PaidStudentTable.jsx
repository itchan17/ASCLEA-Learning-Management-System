import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import Pagination from "@/Components/Pagination";
import { BiFilter } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export default function PaidStudentTable({ students }) {
  const route = useRoute();
  const [search, setSearch] = useState("");

  const handleRowClick = (studentId) => {
    router.visit(route("accounting.student.view", { studentId }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("accounting.paid"), { search }, { preserveState: true });
  };

  return (
    <div className="space-y-5">
      {/* Search and filter */}
      <div className="flex items-center justify-between">
        <div className="font-nunito-sans text-size6 font-bold">
          Paid Students
        </div>
        <div className="flex items-center justify-end">
          <BiFilter className="text-size5" />
          <div className="font-bold text-size2 pr-10">Filter</div>

          <form onSubmit={handleSearch} className="relative">
            <input
              className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
              type="text"
              placeholder="Search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
          </form>
        </div>
      </div>

      {/*Table */}
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <table className="table w-full">
          <thead>
            <tr className="border-b-2 border-ascend-gray3">
              <th>Name</th>
              <th>Program</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          {students?.data?.length > 0 && (
            <tbody>
              {students.data.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => handleRowClick(s.id)}
                  className="hover:bg-ascend-lightblue cursor-pointer"
                >
                  <td className="py-5">{s.name}</td>
                  <td className="py-5">{s.program}</td>
                  <td className="py-5">{s.email}</td>
                  <td className="py-5">
                    <span className="text-ascend-blue underline">
                      View More
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* ✅ Pagination */}
        {students?.links && (
          <Pagination
            links={students.links}
            currentPage={students.current_page}
            lastPage={students.last_page}
            only={["students"]}
          />
        )}
      </div>
    </div>
  );
}
