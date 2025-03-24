import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SearchBar from "./TableComponents/SearchBar"
export default function Select ( {config}){
    const {name,onChange,defaultValue,placeholder,items} = config
     const [isSelectItem,setIsSelectItem]= useState(false)
     const [currentValue,setCurrentValue] = useState(defaultValue) 
    
     
     const [search,setSearch] = useState('')
     const [focus,setFocus] = useState(false)

     const handleChange=(value)=>setSearch(value.toLowerCase())
     
     const select = (obj)=>{
        onChange(name,obj.libel || obj.name || obj.roomName)
        setCurrentValue(obj.libel || obj.name || obj.roomName)
        setIsSelectItem(false)
        setSearch('')
      }
      const data = items.filter(item => String(item.libel || item.name || item.roomName).toLowerCase().includes(search))
    return (
        <div className="relative flex-1">
        <div className={`flex items-center justify-between bg-gray-100   text-gray-700 dark:text-gray-50 dark:bg-gray-900  dark:border-gray-600 border-gray-300  border  rounded-lg   ${isSelectItem?' dark:border-purple-600 border-purple-600' :'border-gray-300'} w-full py-2.5 px-4 `} onClick={()=>setIsSelectItem(!isSelectItem)}>
            { currentValue  ?
                <span >{currentValue}</span>
                :<span className={`text-gray-300 dark:text-gray-600 text-sm font-medium`}>{placeholder}</span>
                 
            }
            <ChevronDown size={20} className={`duration-300  ${isSelectItem && 'rotate-180 text-purple-300'} text-gray-400`}/>
        </div>
        {
            isSelectItem && 
            <div className="absolute p-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800 bottom-12 w-full ">
                <SearchBar  
                    columnNames={['libel']} 
                    searchTerm={search} 
                    handleChange={handleChange} 
                    isFocus={focus} 
                    setIsFocus={setFocus} 
                />
                <div className=" max-h-36 overflow-y-auto  space-y-1 mt-2 select">
                {
                    data.map (g =>
                    <span key={g.libel || g.name || g.roomName} className="bg-gray-100 dark:bg-gray-600 dark:text-gray-50 p-2  rounded-md border hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-500 text-gray-700 block text-sm cursor-pointer " onClick={()=>select(g)}>{g.libel || g.name || g.roomName}</span>
                    )
                }
                </div>
            </div>
            
        }
    </div>
    )
} 