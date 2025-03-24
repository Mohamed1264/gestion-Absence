export default function Infos({info,item}){
    return (
        <div className="flex flex-col items-center gap-5 mx-auto">
                     {
                        info.map(col => 
                            <div className=" flex w-full items-center" key={col.accessor}>
                                <span  className="block  text-sm font-medium text-gray-700 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 rounded-l-md p-2.5 border border-gray-300 dark:border-gray-500  basis-3/6">{col.colName} </span>
                                <span className="bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-r-lg flex-1   block  p-2.5 outline-none dark:bg-gray-600 dark:border-gray-500 dark:text-gray-50  ">{item[col.accessor]}</span>
                            </div>
                        )
                     }
        </div>
    )
}