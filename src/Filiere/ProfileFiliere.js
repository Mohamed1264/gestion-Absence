import { Link, useParams } from "react-router-dom";
import { PenBox, School, Trash2, UserX2 } from "lucide-react";
import { groups, filieres } from "../Users";

import Table from "../LittleComponents/Table";
import { TableProvider } from "../Context";

import DonutChart from "../Charts/DonutChart";
import LineBarChart from "../Charts/LineBarCHart";
import HChart from "../Charts/HChart";
import Infos from "../LittleComponents/Infos";
import ProfileCards from "../LittleComponents/ProfileCards";

// ✅ Improved style object (camelCase keys)
const style = {
  firstYear: { style: "bg-blue-500 dark:bg-blue-300 text-blue-50 dark:text-blue-700", stroke: "stroke-blue-500 dark:stroke-blue-300" },
  secondYear: { style: "bg-purple-400 dark:bg-purple-300 text-purple-50 dark:text-purple-700", stroke: "stroke-purple-400 dark:stroke-purple-300" },
  thirdYear: { style: "bg-cyan-400 dark:bg-cyan-300 text-cyan-50 dark:text-cyan-700", stroke: "stroke-cyan-400 dark:stroke-cyan-300" }
};

// ✅ Improved data structure (camelCase for consistency)
const dataa2 = [
  { type: "firstYear", nbr: 20 },
  { type: "secondYear", nbr: 2 },
  { type: "thirdYear", nbr: 1 }
];

export default function ProfileFiliere() {
  const { id } = useParams();
  const filiere = filieres.find((f) => f.id === Number(id));

  if (!filiere) return <p className="text-red-600">Filière not found</p>;

  return (
    <div className="select-none">
      <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">
        Welcome to {filiere.libel} Profile
      </h1>

      <div className="flex min-w-full gap-5 mb-10">
        {/* ✅ Improved border styling & button spacing */}
        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md px-3 py-2 pt-10 flex-1">
          <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">
            Group Info
          </h3>

          <Infos info={[{ colName: "Libel", accessor: "libel" }]} item={filiere} />

          <div className="flex items-center justify-center gap-3 my-7">
            <Link
              to={`/editFiliere/${filiere.id}`}
              className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              <PenBox size={20} /> Edit
            </Link>

            <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800 px-5 py-2.5 rounded-lg flex items-center gap-2">
              <Trash2 size={20} /> Delete
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 gap-6">
          <ProfileCards
            cardsInfo={[
              { title: "Total Absence", nbr: 20, icon: <UserX2 size={32} /> },
              { title: "Total Groups", nbr: 21, icon: <School size={32} /> }
            ]}
          />
        </div>
      </div>

      {/* ✅ Charts Section */}
      <div className="flex min-w-full gap-5">
        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md px-3 py-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">
            Group Absence Info
          </h3>
          <HChart data={dataa2} />
        </div>

        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md px-5 py-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">
            Group Absence by Year
          </h3>
          <DonutChart css={style} data={dataa2} />
        </div>
      </div>

      {/* ✅ Groups Absence Table */}
      <div className="relative border border-gray-300 dark:border-gray-500 rounded-md px-5 py-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center my-8">
        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">
          All Groups Absence Statistics
        </h3>
        <LineBarChart data={dataa2} />
      </div>

      {/* ✅ Groups List Table */}
      <h2 className="text-gray-700 dark:text-gray-50 mb-2 font-semibold">Groups List</h2>
      <TableProvider>
        <Table
          columns={[
            { colName: "Libel", accessor: "libel", sortable: true },
            { colName: "Year", accessor: "year", sortable: true }
          ]}
          dataset={groups}
          config={{ name: "group", searchBy: ["libel", "year"], dropDown: true }}
        />
      </TableProvider>
    </div>
  );
}