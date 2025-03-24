import { OctagonAlert,} from "lucide-react"
import { useTableContext } from "../../TableContext"
export default function ResetPasswordModal ({topic,children}){
    const {selectedItem,setSelectedItem,setActiveModal} = useTableContext()
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
 
    return (

<div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-50  bg-opacity-80 fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div className="relative p-4 w-full max-w-xl mx-auto">
        <div className="relative bg-gray-50 dark:text-purple-400 text-purple-600 dark:bg-gray-800 rounded-lg shadow border dark:border-gray-500 divide-y divide-gray-600 dark:divide-gray-100">
            
            <div className="px-4 py-3 flex items-center gap-3">
                <OctagonAlert size={40}  />
                <h3 className="text-lg font-semibold  ">Are you sure you want to reset {topic === 'admin' ? 'your password' : `the password of ${topic} ${selectedItem?.name}` }  ?</h3>
            </div>
            <div className="px-4 py-3">
            {children}
            </div>
            

            <div className="flex items-center justify-end  px-4 py-3">
                
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg  dark:hover:text-purple-500   " onClick={handleCancel}>No, Keep it</button>
                <button data-modal-hide="popup-modal" type="button"  className={`text-gray-50 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                    Yes,reset it
                </button>
            </div>
        </div>
    </div>
</div>
    )
};