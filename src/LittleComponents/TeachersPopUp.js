import MultipleSelect from './MultipleSelect'
import { X } from 'lucide-react'
import {users} from '../Users'
import { useState } from 'react'
import { useTableContext } from '../Context'
export default function TeachersPopUp(){
    const {selectedItem,setSelectedItem,setActiveModal} = useTableContext()
    const teachers = users.filter(user=>user.role === 'teacher')
    const [dataSet,setDataset]= useState(teachers)
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
    const removeItem = (item)=>{
      
        setDataset(prev => prev.filter(v=> v.name !== item.name))
        
      }
    return (
        <div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div className="relative p-4 w-full max-w-2xl mx-auto">
        <div className="relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 rounded-lg shadow border dark:border-gray-500 px-3 py-2">
            <h1 className=" mb-4 text-lg font-medium">Manage the teacher of the {selectedItem.libel || selectedItem.name} group</h1>
            <div className="min-h-96">
               <MultipleSelect setItems={setDataset} items={teachers} dataset={dataSet}/>
               <h1 className='text-sm font-medium mt-5'>Teachers List : </h1>
                <div className="flex gap-2 items-center flex-wrap mt-3">
             {dataSet.map(v=>
              <span key={v.id} className="text-sm  px-3 py-2 borber-2 hover:bg-purple-100 border-purple-300 bg-purple-50 text-purple-700  dark:bg-purple-700 dark:text-purple-50 rounded-xl flex items-center gap-2 justify-between ">
              {v.name} 
              <button type="button" onClick={()=>removeItem(v)}><X size={14} className=" text-purple-700 dark:text-purple-50"/></button>
              </span>
             )}
            
          </div>
               
            </div>
            <div className='flex items-center justify-end gap-1 mb-1'>
            
            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 text-sm font-medium  focus:outline-none  rounded-lg dark:hover:text-gray-200 hover:text-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={handleCancel}>Cancel</button>
            <button data-modal-hide="popup-modal" type="button"  className={`text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                    Save
            </button>
            </div>
            
        </div>
    </div>
</div>
    )
}