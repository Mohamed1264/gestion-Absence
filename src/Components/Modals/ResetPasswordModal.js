import { OctagonAlert,} from "lucide-react"
import { useModalContext } from "../../Functions/ModalContext"
import {useEffect , useRef} from 'react'
export default function ResetPasswordModal ({topic,children}){
    const {selectedItem,setSelectedItem,setActiveModal} = useModalContext()
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
    const popoverRef = useRef(null);
    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            handleCancel()
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
 
    return (

<div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900 dark:bg-opacity-50  bg-opacity-50 fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div ref={popoverRef}  className="relative p-4 w-full max-w-md mx-auto">
        <div  className="relative bg-gray-50  text-purple-700 dark:bg-gray-800 rounded-lg shadow border border-gray-300 dark:border-gray-600 divide-y divide-gray-300 dark:divide-gray-600">
            
            <div className="px-4 py-3 flex items-center justify-center flex-col gap-3">
                <OctagonAlert size={40}  />
                <h3 className="text-lg font-semibold text-center">Do you want to reset {topic === 'admin' ? 'your password' : `the password of ${topic} ${selectedItem?.fullName}` }  ?</h3>
            </div>


            <div className="flex items-center justify-end  px-4 py-3">
                
                <button 
                    data-modal-hide="popup-modal" 
                    type="button" 
                    className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg text-purple-700 hover:text-purple-600   " 
                    onClick={handleCancel}
                >
                    No, Keep it
                </button>
                <button 
                    data-modal-hide="popup-modal" 
                    type="button"  
                    className={`text-purple-50 bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                >
                    Yes,reset it
                </button>
            </div>
        </div>
    </div>
</div>
    )
};