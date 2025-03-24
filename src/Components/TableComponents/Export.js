import { useState } from "react"
import ShortCut from "../ShortCut"
import { FileText,FileSpreadsheet } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { exportAsExcel } from "../../Functions/ExportAsExcel"
import { exportAsPdf } from "../../Functions/ExportAsPdf"

export const Export  = ({isDisabled ,columns,name,sortedData})=>{
    const [exportDropDown,setExportDropDown]= useState(false)

    const keys  = columns.map(col => col.accessor);
    const columnNames = columns.map(col => col.colName)

    const  getValues= (dataa)=>{
        var values = keys.map(key => dataa[key])
        return values
    }
          
    const fileName  = `${name}s List`

    const excelExport = ()=> exportAsExcel(name ,columnNames ,sortedData,setExportDropDown,fileName ,getValues)
    const pdfExport = ()=> exportAsPdf(columnNames,sortedData,getValues,fileName)

     // shortcuts
     useHotkeys("shift+e", () => !isDisabled && setExportDropDown(!exportDropDown));
     useHotkeys("e", ()=>exportDropDown && excelExport());
     useHotkeys("p", ()=>exportDropDown && pdfExport());
    return (
         
         <div className="relative max-w-56 mr-2 ">
         <button 
             onClick={()=>setExportDropDown(!exportDropDown)}
            
             disabled={isDisabled}
             className={` relative bg-gray-700 group outline-none  px-3 py-2 text-gray-50 hover:bg-gray-600 text-sm flex items-center justify-between gap-4 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${exportDropDown ? 'rounded-t-md' : 'rounded-md'}`}
         >
                  <div className="flex items-center gap-2">
                  <FileText size={18}/>
                  <span >Export Results</span>
                  </div> 
                  <ShortCut shortCut='Shift + E'/>
         </button>


         {exportDropDown && (
             <div className="absolute  z-50 min-w-full  rounded-b-lg dark:bg-gray-100 bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 ">
               <div className="p-2 space-y-1">
                   <button 
                     onClick={excelExport} 
                     className=" rounded-sm flex group outline-none text-gray-50 hover:bg-gray-500 dark:text-gray-700 dark:hover:bg-gray-200 gap-2 items-center justify-between text-sm font-medium p-2 w-full "
                   >
                     
                     <div className="flex items-center gap-2">
                     <FileSpreadsheet size={16}/>
               
                     <span >Export as Excel</span>
                     </div> 
                     <ShortCut shortCut='E'/>
                   </button>
                   <button 
                   onClick={pdfExport} 
                     className="  rounded-sm group outline-none flex gap-2 text-gray-50 hover:bg-gray-500 dark:text-gray-700 dark:hover:bg-gray-200 text-sm font-medium items-center justify-between p-2 w-full"
                   >
                     <div className="flex items-center gap-2">
                     <FileText size={16}/>
                     
                     <span >Export as Pdf</span>
                     </div> 
                     <ShortCut shortCut='P'/>
                   </button>
                 
               </div>
             </div>
         )}

         </div>
    )
}