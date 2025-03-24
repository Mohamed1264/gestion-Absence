import { ChevronsUpDown } from "lucide-react"
export default function Theader({ columns, change, isAction }) {
  return (
    <thead>
      <tr className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
        {columns.map((col, index) => (
          <th
            key={index}
            scope="col"
            className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}
          >
            <span className="flex items-center gap-1">
              {col.colName}
              {!col.notSortable && (
                <button onClick={() => change(col.accessor)}>
                  <ChevronsUpDown
                    size={16}
                    className="hover:text-gray-600 dark:hover:text-gray-200"
                  />
                </button>
              )}
            </span>
          </th>
        ))}
        {isAction && (
          <th className="lg:px-3 lg:pl-0 lg:py-3 px-2 py-2 text-end text-xs  uppercase font-semibold">
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
}