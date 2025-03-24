import { Search,X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({columnNames,searchTerm,handleChange}) {
    const [isFocus,setIsFocus] = useState(false)
    return (
        <div className={`flex items-center gap-2 justify-between text-gray-700 dark:text-gray-50 py-2 border border-gray-300 dark:border-gray-600 rounded-md  px-3 ${isFocus && 'border-purple-600 dark:border-purple-600'} min-w-64`}>
            <div className="flex items-center gap-2  flex-1">
              <Search size={20} className={` ${isFocus ?'text-purple-600 ': 'text-gray-300 dark:text-gray-600'}`}/>
              <input 
                type="text" 
                className="border-none outline-none placeholder:text-xs placeholder:text-gray-300 dark:placeholder:text-gray-600 text-sm text-gray-700 dark:text-gray-50 w-full flex-1 pr-3 bg-transparent" 
                placeholder={`Search by ${columnNames.join(' or ')} `}
                onChange={({target})=>handleChange(String(target.value).toLowerCase().trim())}
                value={searchTerm}
                onFocus={()=>setIsFocus( true)}
                onBlur={()=>setIsFocus( false)}
              />
            </div>
            <button onClick={()=>handleChange('')}   className={`  ${searchTerm.trim() ? 'block':'hidden'} cursor-pointer hover:text-purple-500 text-purple-600  duration-200`}>
              <X size={20} />
            </button>
           
        </div>
    )
}