import { Ellipsis } from "lucide-react"

import { useModalContext } from "../Functions/ModalContext";
function DropDownMenu ({item,children,primaryKey}){
  const {selectedItem,setSelectedItem} = useModalContext();
  const checkItem = selectedItem?.[primaryKey] === item?.[primaryKey]
   
    const toggleMenu = ()=>{
      setSelectedItem(checkItem ? null : item)
    }

    return (
        <div className="relative  inline-block text-left" >
        {/* Trigger Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 px-4 py-2  "
        >
          <Ellipsis 
            size={20} 
            className={`text-gray-700 dark:text-gray-50 transition-transform duration-200 ${
              (checkItem)  ? 'transform rotate-180' : ''
            }`}
          />
        </button>
  
   
        {checkItem && (
          <div className="absolute z-50 -left-14 bottom-10 min-w-max  rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-2 space-y-1 text-gray-700 dark:text-gray-50 ">
                {children}
  
              
            </div>
          </div>
        )}
      </div>
    )
}
export default DropDownMenu;