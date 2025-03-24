import {  User } from "lucide-react";
import { useState } from "react";
import Select from "../LittleComponents/Select";
import { useParams } from "react-router-dom";
import { students,groups,style,errorsMsgs } from "../Users";
import ErrorMsg from "../LittleComponents/ErrorMsg";


const names = ['cef','name','age']
export default function EditStudent(){
    const {id} = useParams();
    const student = students.find(student => student.cef === id)
   
    
   
   

    
      const [formData,setFormData] = useState(student)
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
         defaultValue : student.group
        }
     
    return (
        <>
        <div className="mb-5 mt-3 flex items-center gap-3 text-gray-700 dark:text-gray-50">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl font-bold ">Edit {student.name} info</h1>
        </div>
        {/* form */}

        
      
          <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
           
           {/* cef input */}
           <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Cef</label>
                       <input 
                          type="text" 
                          name="cef" 
                          defaultValue={formData.cef} 
                          className={`rounded-r-md px-3  border  py-2  outline-none placeholder:text-sm ${style.input}    ${errors.cef ? style.errorBorder :style.border} ${style.focusInput} `} 
                          placeholder="Enter student's cef" 
                          onChange={({target})=>handleChange('cef',target.value)}
                          onFocus={()=>InFocus('cef')}

                          />
                  </div>
                  <ErrorMsg value={errors.cef}/>
              {/* full name input */}
           <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Full Name</label>
                       <input 
                          type="text" 
                          name="name" 
                          defaultValue={formData.name} 
                          className={`rounded-r-md px-3  border  py-2  outline-none placeholder:text-sm ${style.input}    ${errors.name ? style.errorBorder :style.border} ${style.focusInput} `} 
                          placeholder="Enter student's name" 
                          onChange={({target})=>handleChange('name',target.value)}
                          onFocus={()=>InFocus('name')}

                          />
                  </div>
                  <ErrorMsg value={errors.name}/>
             {/* age input */}
           <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Age</label>
                       <input 
                          type="text" 
                          name="age" 
                          defaultValue={formData.age} 
                          className={`rounded-r-md px-3  border py-2  outline-none placeholder:text-sm ${style.input}    ${errors.age ? style.errorBorder :style.border} ${style.focusInput} `} 
                          placeholder="Enter student's age" 
                          onChange={({target})=>handleChange('age',target.value)}
                          onFocus={()=>InFocus('age')}

                          />
                  </div>
                  <ErrorMsg value={errors.age}/>

            {/* gender input */}
            <div class="flex my-3 w-full">
                     <label  className={`px-3 py-2  rounded-l-md border ${style.label}  ${style.border} basis-1/2 max-w-[178px] `}>Gender </label>
                     <div className={`flex gap-4 border ${style.input}  ${ style.border} rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div className="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              defaultChecked={formData.gender === 'Male'}   
                              className="    accent-purple-400 cursor-pointer"  
                              onChange={({target})=>handleChange('gender',target.value)}
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Male </label>
                        </div>
                        <div class="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'} 
                              defaultChecked={formData.gender === 'Female'}   
                              className="  accent-purple-400 cursor-pointer" 
                              onChange={({target})=>handleChange('gender',target.value)}  
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Female </label>
                        </div>
                        
                  
                     </div>
         
                  </div>
           

            <div class="flex my-3 mb-0  w-full">
                    <label  className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2 max-w-[178px]`}>Group </label>
                    <Select items={groups} config={config}/>
                      
                    </div>
                    <ErrorMsg value={errors.group}/>

                    {/*submit button */}
            <button type="submit" className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Edit Student</button>
        </form>

        
        



        </>
      
    )
}