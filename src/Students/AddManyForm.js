import { useState } from "react"
import { UploadCloud, } from "lucide-react"
import Select from "../LittleComponents/Select"

import { errorsMsgs,style } from "../Users"
import ErrorMsg from "../LittleComponents/ErrorMsg"

const names = ['file','group']
export default function AddManyForm({groups}){
   

         const [formData,setFormData] = useState({})
         const [errors,setErrors]= useState({})
    
         const handleChange = (name,value)=>{
            
                

            setFormData(prev=> ({...prev,[name]:value}))
            if (name === 'file') {
                InFocus(name)
            }

         }
         const InFocus = (name)=>{
           
            const updetedErros = {...errors}
            delete updetedErros[name]
            setErrors(updetedErros)
         }
         const handleError=()=>{
            const failures= {}
            names.forEach(name => {
              if (!formData[name]) failures[name] = errorsMsgs[name]
              
            });
             
            return failures
            
         }
         const handleSubmit = (e)=>{
            e.preventDefault()
            const validation = handleError()
        
            
            
            if (Object.keys(validation)){
                setErrors(validation)
                return false
            }
            
            
           
            
            
            
         }
         const config = {
            type : 'group',
            error: errors.group,
            onDelete : InFocus,
            onChange : handleChange,
            defaultValue : false,
            placeholder : 'select group'
           }

    return (
          <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
            <div className="mb-3 flex w-full ">
                <label  className={`px-3 py-2  rounded-l-md border-r-0 border ${style.label} ${style.border } basis-1/2 max-w-[178px]`}>Import File </label>
    
                <div class={`rounded-r-md px-3 border py-2  outline-none flex-1  ${style.input} ${errors.file ? style.errorBorder : style.border }  `}>
                    <label for="dropzone-file"  className="flex items-center justify-center gap-2 " >
                       
                        {
                            formData.file ? 
                            <p class="text-sm text-gray-700 dark:text-gray-50">{formData.file?.name}</p>
                            :
                            <>
                            <UploadCloud size={20} className="text-gray-500"/>
                            <p class=" text-sm font-semibold text-gray-500">Uplod XLS, XLSX  </p>
                        
                            </>
                            
                        }
                        
                       
                        <input 
                           id="dropzone-file" 
                           type="file" 
                           name="file"
                           class="hidden" 
                           accept=".xls,.xlsx" 
                           onChange={({target})=>handleChange('file',target.files[0])}

                        />
                    </label>
                </div> 

            </div>
            <ErrorMsg value={errors.file}/>

            <div class="flex my-3 w-full">
                <label  className={`px-3 py-2  rounded-l-md border-r-0 border ${style.label} ${style.border } basis-1/2 max-w-[178px]`}>Group </label>
                <Select 
                 
                   items={groups} 
                   onDelete={InFocus} 
                    config = {config}
     
                />                
            </div>
            <ErrorMsg value={errors.group}/>
           
       
  
            {/* submit Button */}
            <button type="submit" className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Import Students</button>
        </form> 
    )
}