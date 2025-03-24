import { toast } from "react-toastify"



import { CheckCheck, CircleAlert,X} from "lucide-react";

function CustomToast ({message, closeToast, toastProps}) {
            const icons = {
               success :  <CheckCheck size={20} className=" mr-2 text-2xl" />,
               error :  <X size={20} className=" mr-2 text-2xl" />,
               info :  <CircleAlert size={20} className=" mr-2 text-2xl" />,
            }
            return (
            <div className={`flex items-center justify-between rounded-md px-3 py-2 w-full`}>
              <div className="flex items-center ">
              {icons[toastProps.type]}
              <span className="text-sm font-bold">{message}</span>
         
              </div>
              
              {/* Custom Close Button */}
              <X
                className={` cursor-pointer ml-3 text-xl`}
                onClick={closeToast}
              />
            </div>
)}

export const successNotify  = (msg)=> toast.success(<CustomToast message={msg}/>,
                { 
                position: 'bottom-right',
                className: 'p-0 w-76 bg-green-600 dark:bg-green-100 text-green-100 dark:text-green-600',
                icon : false,
                progressClassName: "bg-green-100 dark:bg-green-600",
                autoClose: 3000
                
                }
)

export const dangerNotify  = (msg)=> toast.error(<CustomToast message={msg}/>,
  { 
  position: 'bottom-right',
  className: 'p-0 w-76 bg-red-600 dark:bg-red-100 text-red-100 dark:text-red-600',
  icon : false,
  progressClassName: "bg-red-100 dark:bg-red-600",
  
  }
)
               
                  
   