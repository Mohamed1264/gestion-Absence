import { useState } from "react";
import Select from "../LittleComponents/Select";
import { errorsMsgs,style } from "../Users";
import ErrorMsg from "../LittleComponents/ErrorMsg";
const names=['cef','name','age','group']

export default function AddOneForm ({groups}){
    //  const [selectedGroup,setSelectedGroup]= useState({});
     const [formData,setFormData] = useState({})
     const [errors,setErrors]= useState({})

     const handleChange = (name,value)=>{
       
        setFormData(prev=> ({...prev,[name]:value}))

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
      placeholder:'select group'
     }
    return (
         <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
                  {/* cef input */}
                  <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 basis-1/2 ${style.label}  ${style.border} `}>Cef</label>
                       <input 
                          type="text" 
                          name="cef" 
                          defaultValue={''} 
                          className={`rounded-r-md px-3 border  py-2  outline-none placeholder:text-sm ${style.input}    ${errors.cef ? style.errorBorder :style.border} ${style.focusInput} `} 
                          placeholder="Enter student's cef" 
                          onChange={({target})=>handleChange('cef',target.value)} 
                          onFocus={()=>InFocus('cef')}

                      />
                  </div>
                  <ErrorMsg value={errors.cef}/>

                  {/* full name input */}
                  <div className="flex my-3 mb-0  w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0  basis-1/2 ${style.label}  ${style.border}`}>Full Name</label>
                       <input 
                          type="text" 
                          name="name" 
                          defaultValue={''} 
                          className={`rounded-r-md px-3 border  py-2  outline-none placeholder:text-sm ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
                          placeholder="Enter student's full name" 
                          onChange={({target})=>handleChange('name',target.value)} 
                          onFocus={()=>InFocus('name')}

                        />
                  </div>
                  <ErrorMsg value={errors.name}/>

                  {/* age input  */}
                  <div className="flex my-3 mb-0  w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 basis-1/2 ${style.label}  ${style.border} `}>Age</label>
                       <input 
                          type="number" 
                          name="age" 
                          defaultValue={''} 
                          className={`rounded-r-md px-3 border  py-2  outline-none placeholder:text-sm ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                          placeholder="Enter student's Age" 
                          onChange={({target})=>handleChange('age',target.value)} 
                          onFocus={()=>InFocus('age')}

                        />
                  </div>
                  <ErrorMsg value={errors.age}/>
             

                  {/* gender input */}
                  <div className="flex my-3 mb-0  w-full">
                    <label  className={`px-3 py-2  rounded-l-md border border-r-0 basis-1/2 max-w-[178px]  ${style.label}  ${style.border} `}>Gender </label>
                    <div className={`flex gap-4  ${style.input} ${style.border}  rounded-r-md px-3 border  py-2  flex-1 `}>
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              defaultChecked   
                              className="    accent-purple-400 cursor-pointer"  
                              onChange={({target})=>handleChange('gender',target.value)} 
                             />
                            <label  className={` mb-1 text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'}   
                              className="  accent-purple-400 cursor-pointer"  
                              onChange={({target})=>handleChange('gender',target.value)} 

                            />
                            <label  className={` mb-1 text-sm font-medium text-gray-700 dark:text-gray-50 `}>Female </label>
                        </div>
                        
                  
                    </div>
            
                  </div>
               
                  

                  {/* group select */}
                  <div class="flex my-3 mb-0  w-full">
                    <label  className={`px-3 py-2  rounded-l-md border border-r-0 basis-1/2 max-w-[178px] ${style.label}  ${style.border} `}>Group </label>
                    <Select 
                      config={config}
                      items={groups} 
                     
                    /> 
                    </div>
                    <ErrorMsg value={errors.group}/>

                  {/* Submit Button */}
                    <button type="submit" className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3">Add Student</button>
                </form>
    )
}