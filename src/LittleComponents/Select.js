import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SearchBar from "./SearchBar"
export default function Select ( {items ,config}){
    const {type,onDelete,onChange,defaultValue,error,placeholder} = config
     const [isSelectItem,setIsSelectItem]= useState(false)
     const [selectedItem,setSelectedItem] = useState(defaultValue || null)

     const [dataset,setDataset] = useState(items)
     const handleClick = ()=>{
        setIsSelectItem(!isSelectItem)
        onDelete(type)
     }

     const select = (obj)=>{
        setSelectedItem( obj.libel || obj.name)
        onChange(type,obj.libel || obj.name)
        setIsSelectItem(false)
      }
    return (
        <div className="relative flex-1">
        <div className={`flex items-center justify-between bg-white   text-gray-700 dark:text-gray-50 dark:bg-gray-800 ${error ? 'border-red-600' : ' dark:border-gray-500'}  border text-sm rounded-r-md   ${isSelectItem?'border-purple-300 dark:border-purple-500' :'border-gray-300'} w-full p-2.5`} onClick={handleClick}>
            { selectedItem  ?
                <span className="text-gray-700 dark:text-gray-50 text-sm">{selectedItem}</span>
                :<span className={`text-gray-400 text-sm`}>{placeholder}</span>
                 
            }
            <ChevronDown size={20} className={`duration-300  ${isSelectItem && 'rotate-180 text-purple-300'} text-gray-400`}/>
        </div>
        {
            isSelectItem && 
            <div className="absolute p-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800 bottom-12 w-full ">
                <SearchBar data={items} setData={setDataset} columnNames={['libel']}/>
                <div className=" max-h-36 overflow-y-auto  space-y-1 mt-2 select">
                {
                    dataset.map (g =>
                    <span className="bg-gray-100 dark:bg-gray-600 dark:text-gray-50 p-2  rounded-md border hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-500 text-gray-700 block text-sm cursor-pointer " onClick={()=>select(g)}>{g.libel || g.name}</span>
                    )
                }
                </div>
            </div>
            
        }
    </div>
    )
} 