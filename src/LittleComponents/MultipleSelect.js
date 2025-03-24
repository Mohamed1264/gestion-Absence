import { ChevronDown, X } from "lucide-react"
import { useState } from "react"

import SearchBar from "./SearchBar"

export default function MultipleSelect ({items,setItems,dataset}){
  const [focusing,setFocusing] = useState(false)
  
  const [data,setData] =useState(items);

  const handleChange=(item)=>{
    if (dataset.find(v => v === item)) {
      setItems(dataset.filter(v=> v.name !== item.name))
      return false
    }
    setItems(prev => [...prev,item])
  }


  const handleClick = ()=>{
    setFocusing(!focusing)   
 }

  
  return (
    <>
      <div className="relative flex-1">
      <div className={`flex items-center justify-between border text-sm rounded-md  py-2.5 px-3 outline-none text-gray-700 dark:text-gray-50 dark:bg-gray-800 dark:border-gray-600  ${focusing && 'border-purple-300 dark:border-purple-500'}`} onClick={handleClick}>
      
          <span className="text-gray-400 text-sm ">Select Teachers</span>
          
        <div className="flex items-center gap-1">
            
            <button type="button" onClick={()=>setFocusing(!focusing)} >
              <ChevronDown size={14} className={`text-gray-400  ${focusing && 'rotate-180 text-purple-500'}`}/>
            </button>
 
        </div>
        
      </div>
      { focusing &&
        <div className= " absolute w-full  mt-2 p-3 border border-gray-300   bg-gray-50 dark:border-gray-500 dark:bg-gray-800 rounded-lg ">
          <SearchBar columnNames={['name']} data={items} setData={setData}/>
          <div className=" mt-2 max-h-32 space-y-2 select overflow-y-auto">
          {
            items.map(
              teacher => 
              <span 
                key={teacher.id} 
                className={`px-3 block  min-w-20 rounded-md py-1 dark:text-gray-50  cursor-pointer ${dataset.includes(teacher) ? 'dark:bg-purple-600 dark:hover:bg-purple-500' : 'dark:bg-gray-500 dark:hover:bg-gray-600'}`} 
                onClick={()=>handleChange(teacher)}
              >
                {teacher.name}
              </span>
            )
          }
          </div>
        </div>
      }

      </div>
    </>
  )
}