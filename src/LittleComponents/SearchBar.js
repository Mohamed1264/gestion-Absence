import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx"; // Install via `npm install clsx`

export default function SearchBar({ data, columnNames, setData }) {
  const inputRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const originalData = useRef(data); // Keep a copy of the original data

  // Filter function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchTerm(value);
    setData(
      originalData.current.filter((d) =>
        columnNames.some((col) => String(d[col]).toLowerCase().includes(value))
      )
    );
  };

  // Clear search input and reset data
  const clearSearch = () => {
    setSearchTerm("");
    setData(originalData.current); // Reset to original data
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-2 justify-between text-gray-700 dark:text-gray-50 py-2 border rounded-md px-3",
        {
          "border-gray-700": isFocus,
          "dark:border-gray-500": !isFocus,
        }
      )}
    >
      {/* Search Icon & Input */}
      <div className="flex items-center gap-2 w-full">
        <Search
          size={20}
          className={clsx(
            isFocus ? "text-gray-700 dark:text-gray-50" : "text-gray-400 dark:text-gray-500"
          )}
        />
        <input
          type="text"
          className="w-full border-none outline-none placeholder:text-xs dark:placeholder:text-gray-500 text-sm text-gray-700 dark:text-gray-50 bg-transparent"
          placeholder={`Search by ${columnNames.join(" or ")}`}
          onChange={handleSearch}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          ref={inputRef}
        />
      </div>

      {/* Clear Button (X) */}
      {searchTerm && (
        <X
          size={20}
          className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-50 cursor-pointer duration-200"
          onClick={clearSearch}
        />
      )}
    </div>
  );
}
