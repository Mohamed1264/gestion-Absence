import { useState, useEffect, useRef } from "react";
import ShortCut from "../../ShortCut";
import { FileText, FileSpreadsheet } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { exportAsExcel } from "../../Functions/ExportAsExcel";
import { exportAsPdf } from "../../Functions/ExportAsPdf";

export const Export = ({ isDisabled, columns, name, sortedData = [] }) => {
  const [exportDropDown, setExportDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const keys = columns.map(col => col.accessor);
  const columnNames = columns.map(col => col.colName);

  const getValues = (dataa) => keys.map(key => dataa[key]);

  const fileName = `${name}s List`;

  const excelExport = () => {
    exportAsExcel(name, columnNames, sortedData, setExportDropDown, fileName, getValues);
  };

  const pdfExport = () => {
    exportAsPdf(columnNames, sortedData, getValues, fileName);
  };

  // Shortcuts
  useHotkeys("shift+e", () => !isDisabled && setExportDropDown(!exportDropDown));
  useHotkeys("e", () => exportDropDown && excelExport());
  useHotkeys("p", () => exportDropDown && pdfExport());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExportDropDown(false);
      }
    };

    if (exportDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [exportDropDown]);

  return (
    <div ref={dropdownRef} className="relative max-w-56 mr-2">
      {/* Export Button */}
      <button
        onClick={() => setExportDropDown(!exportDropDown)}
        disabled={isDisabled}
        className={`relative group outline-none px-3 py-2 text-gray-50 bg-gray-700 hover:bg-gray-600 text-sm flex items-center justify-between gap-4 font-medium 
        dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed 
        ${exportDropDown ? "rounded-t-md" : "rounded-md"}`}
        aria-label="Export Options"
      >
        <div className="flex items-center gap-2">
          <FileText size={18} />
          <span>Export Results</span>
        </div>
        <ShortCut shortCut="Shift + E" />
      </button>

      {/* Dropdown */}
      {exportDropDown && (
        <div className="absolute z-50 min-w-full rounded-b-lg bg-gray-600 dark:bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2 space-y-1">
            {/* Export Excel */}
            <button
              onClick={excelExport}
              className="rounded-sm flex group outline-none text-gray-50 hover:bg-gray-500 dark:text-gray-700 dark:hover:bg-gray-200 gap-2 items-center justify-between text-sm font-medium p-2 w-full"
              aria-label="Export as Excel"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} />
                <span>Export as Excel</span>
              </div>
              <ShortCut shortCut="E" />
            </button>

            {/* Export PDF */}
            <button
              onClick={pdfExport}
              className="rounded-sm flex group outline-none text-gray-50 hover:bg-gray-500 dark:text-gray-700 dark:hover:bg-gray-200 gap-2 items-center justify-between text-sm font-medium p-2 w-full"
              aria-label="Export as PDF"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Export as PDF</span>
              </div>
              <ShortCut shortCut="P" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
