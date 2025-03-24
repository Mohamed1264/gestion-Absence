import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import Tbody from "./Tbody";
import Theader from "./Theader";
import { exportToExcel, exportToJSON, exportToPDF } from "../utils/exportUtils";

export default function Table({
  columns,
  data = [],
  config = {},
  selectedItems,
  setSelectedItems,
  handleCheckboxChange
}) {
  
  const [sortedBy, setSortedBy] = useState({ col: "", mode: "ASC" });
  const [selectAll, setSelectAll] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const keys = columns.map((col) => col.accessor);
  const cols = columns.map((col) => col.colName);
 
  
  const changeCol = (col) => {
    setSortedBy((prev) =>
      prev.col === col
        ? { ...prev, mode: prev.mode === "ASC" ? "DESC" : "ASC" }
        : { col: col, mode: "ASC" }
    );
  };

  function number(a, b) {
    return sortedBy.mode === "ASC" ? a - b : b - a;
  }

  function strings(a, b) {
    return (String(a || "").toLowerCase()).localeCompare(
      String(b || "").toLowerCase()
    ) * (sortedBy.mode === "ASC" ? 1 : -1);
  }

  const sortedData = [...data].sort((a, b) =>
    isNaN(a[sortedBy.col]) ? strings(a[sortedBy.col], b[sortedBy.col]) : number(a[sortedBy.col], b[sortedBy.col])
  );
  console.log(sortedData);
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedData.map((t) => t.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      {/* Export Button */}
    
    <div className="relative inline-block text-left">
      {/* Export Button */}
      <button
        onClick={() => setShowExportOptions(!showExportOptions)}
        className="bg-gray-700 rounded-md px-3 py-2 text-gray-50 hover:bg-gray-600 text-sm flex items-center gap-2 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50"
      >
        Export
      </button>

      {/* Dropdown List */}
      {showExportOptions && (
        <div
          className="absolute mt-2 w-18 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 dark:bg-gray-800"
        >
          <div className="py-1 flex flex-col">
            <button
              onClick={() => exportToExcel(data, columns)}
              className="block w-full text-left px-4 py-2 text-sm text-green-700 rounded hover:bg-green-100 dark:text-green-200 dark:hover:bg-green-700"
            >
              EXCEL
            </button>
            <button
              onClick={() => exportToJSON(data)}
              className="block w-full text-left px-4 py-2 text-sm text-yellow-700 rounded hover:bg-yellow-100 dark:text-yellow-200 dark:hover:bg-yellow-700"
            >
              JSON
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                exportToPDF(data, columns);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-700 rounded hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-700"
            >
              PDF
            </button>
          </div>
        </div>
      )}
    </div>

      <table className="min-w-full max-w-4xl divide-y text-center divide-gray-100 dark:divide-gray-500 rounded-lg table-auto">
        <Theader columns={columns} change={changeCol} config={config} selectAll={selectAll}  handleSelectAll={handleSelectAll} />
        <Tbody data={sortedData} config={config} columns={columns} selectedItems={selectedItems} setSelectedItems={setSelectedItems} handleCheckboxChange={handleCheckboxChange} />
      </table>
    </div>
  );
}