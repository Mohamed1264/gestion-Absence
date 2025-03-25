import { ChevronsUpDown } from "lucide-react"
export default function Theader ( {columns,change , config,selectAll,handleSelectAll}){
    return (
        <thead>
            <tr className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
            {config.selects && (
            <th  scope="col" className={`lg:px-3 lg:py-3  py-2 text-center text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>
                <label className="flex items-center space-x-2 cursor-pointer mb-2">
                <input type="checkbox" className="peer hidden" checked={selectAll} onChange={handleSelectAll} />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-purple-600 peer-checked:bg-purple-600"></div>
                <span className="flex items-center gap-1">Select All</span>
                </label>
            </th>
            )}

            {
                columns.map(
                    (col,index)=> 
                    <th key={index} scope="col" className={`lg:px-3 lg:py-3  py-2 text-center text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>
                    <span className="flex items-end text-end gap-1">
                      {col.colName}
                     {col.sortable && <button onClick={()=>change(col.accessor)}><ChevronsUpDown size={16} className="hover:text-gray-600 dark:hover:text-gray-200"/></button>}
                    </span>
                    </th>
                )
                
            }
            {
                !config.selects &&
             <th scope="col" className={`lg:px-3 lg:py-3  py-2 text-center text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>
                Actions
            </th>
            }
            </tr>
          </thead>
    )
}