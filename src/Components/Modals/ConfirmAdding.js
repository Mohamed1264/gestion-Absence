import { OctagonAlert } from "lucide-react"
export default function ConfirmAdding ( {data,handleClick,setIsSubmited}){
    return (
        <div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div className="relative p-4 w-full max-w-xl mx-auto">
        <div className="relative bg-blue-100 dark:text-blue-900 text-blue-700 dark:bg-blue-200 rounded-lg shadow border dark:border-gray-500 divide-y divide-blue-700">
            
            <div className="px-4 py-3 flex items-center gap-4">
                <OctagonAlert size={36} className="   " />
                <h3 className=" text-lg font-semibold  ">Are you sure you want to add  student ?</h3>
                
            </div>
            <div className="px-4 py-3 ">
                 <h2 className="mb-2 font-medium">With the information below :</h2>
                 <ul className=" list-disc px-3">
                 {
                       Object.keys(data).map(key => 
                       (key !== 'confirmPassword' && key !== 'password') && <li>
                           <span className=" capitalize font-semibold">{key} : </span> 
                           <span>{data[key]}</span>
                        </li>
                     )
                     }
                 </ul>
                </div>
            <div className="flex items-center justify-end  px-4 py-3">
                
                <button 
                    data-modal-hide="popup-modal" 
                    type="button" 
                    className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg  hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 " 
                    onClick={()=>setIsSubmited(false)}
                >
                    No, cancel 
                </button>
                <button 
                data-modal-hide="popup-modal" 
                type="button"  
                onClick={handleClick}
                className={`text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                >
                    Yes,Add it
                </button>
            </div>
        </div>
    </div>
</div>
    )
}