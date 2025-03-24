import {  Pencil } from "lucide-react"
import { useNavigate ,Link} from "react-router-dom"
import Alert from "./Alert"
import { useHotkeys } from "react-hotkeys-hook"
import ShortCut from "./ShortCut"
export default function PageHeader({title,link,alerted=true}){
    const nv = useNavigate()
    
useHotkeys("shift+n", ()=>nv(link));
    
     
  
    return (
        <div className=" mb-5 space-y-4">
        <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold capitalize"> {title}</h1>
            <Link to={link} className="bg-gray-700 group rounded-md px-3 py-2 text-gray-50 hover:bg-gray-600 text-sm flex items-center justify-between gap-4  mr-2 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50">
                
                <div className="flex items-center gap-2">
                <Pencil size={18} />
                <span className=" capitalize">Add new {title}</span>
                </div>
              <ShortCut shortCut='Shift + N'/>
            </Link>
        </div>
           {alerted && <Alert msg={`if you delete any ${title} ,all values associated with this ${title} will be lost`}/>}
        </div>
    )}