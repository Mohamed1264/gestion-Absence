
import { useModalContext } from '../../Functions/ModalContext'
import GroupSchedule from '../../Schedule/GroupSchedule'
import { XOctagon } from 'lucide-react'
export default function MoreInfoModal({config}){
    const {name} = config
    const key  = name === 'teacher' ? 'libel' : 'name'
    const {selectedItem,setSelectedItem,setActiveModal} = useModalContext()
    
   
    
    
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }

    return (
        <div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh" >
    <div className="relative p-4 w-full max-w-4xl mx-auto">
        <div className="relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 rounded-lg shadow border dark:border-gray-500 px-3 py-2">
            <div className='flex items-center justify-between mb-4'>
            <h1 className=" text-lg font-medium">  {selectedItem?.name || selectedItem?.libel}  Schedule</h1>
            <button
                onClick={handleCancel}
            >
                <XOctagon size={28} className='text-gray-600 hover:text-red-500'/>
            </button>
            </div>
           
            <div className="min-h-96">
               <GroupSchedule />
            </div>
            
            
        </div>
    </div>
</div>
    )
}