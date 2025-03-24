import { OctagonAlert } from "lucide-react"
import { useModalContext } from "../../Functions/ModalContext"
import {useRef} from 'react'
import useClickOutSide from "../../Functions/useClickOutSide"

export default function DeleteModal({name}){
    const {selectedItem,setSelectedItem,setActiveModal} = useModalContext()
   
    const resetModal = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
    const popoverRef = useRef(null);
    // Close popup when clicking outside
    useClickOutSide(resetModal,popoverRef)


    return (
<div  className="mx-auto overflow-y-auto overflow-x-hidden bg-red-900 bg-opacity-20  fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh cursor-pointer" >
    <div className="relative p-4 w-full max-w-md mx-auto">
        <div  ref={popoverRef} className="relative rounded-lg shadow border text-red-500   bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 divide-y divide-y-gray-300 dark:divide-gray-600">
            
            <div className="px-4 py-3 flex items-center flex-col justify-center gap-3">
                <OctagonAlert size={40}  />
                <h3 className=" text-lg font-semibold  text-center">Do you want to delete the {name} {selectedItem?.fullName || selectedItem?.libel} ?</h3>
                
            </div>

            <div className="flex items-center justify-end px-4 py-3 ">
                
                <button 
                    data-modal-hide="popup-modal" 
                    type="button" 
                    className="py-2.5 px-5 text-sm font-medium  focus:outline-none dark:hover:text-red-700  hover:text-red-600 " 
                    onClick={resetModal}
                >
                    No, Keep it
                </button>
                <button 
                    data-modal-hide="popup-modal" 
                    type="button"  
                    className={`bg-red-700 hover:bg-red-600  text-red-50 focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                >
                    Yes,delete {name}
                </button>
            </div>
        </div>
    </div>
</div>
    )
}