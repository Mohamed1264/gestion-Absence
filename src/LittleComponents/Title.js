import { Pencil,FileText } from "lucide-react"
import { Link } from "react-router-dom"
import Alert from "./Alert"

export default function Title({dataset,title,link,alerted}){
    return (
        <>
        <div>
            <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7 capitalize">{dataset.length} {title}s</h1>
           {alerted && <Alert msg={`if you delete any ${title} ,all values associated with this group will be lost`}/>}
        </div>
        <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 capitalize">{title}s List </h1>
            <div className="flex items-center gap-2">
             
               { !alerted &&
                <Link to={link} className="bg-gray-700 rounded-md px-3 py-2 text-gray-50 hover:bg-gray-600 text-sm flex items-center gap-2 mr-2 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50">
                    <Pencil size={18} />
                    <span >Add new {title}</span>
                </Link>}

            </div>
            
        </div>
     </>
    )
}