import { TriangleAlert } from "lucide-react"
export default function Alert ({msg}){
    return (
        <div className="mb-3 mt-0  gap-3 text-red-600 rounded-md text-md font-medium bg-red-100 px-3 py-2 relative before:content(' ') before:absolute before:h-full before:w-1 before:rounded-l-md before:bg-red-600 before:-left-0 before:-top-0"> 
            <div className="flex items-center gap-2 ">
            <TriangleAlert size={20} strokeWidth={2.4} />
            <span>Warning</span>
            </div>
            
            <p className="ml-3 my-2 first-letter:uppercase font-medium ">{msg}</p>
          </div>
    )
}