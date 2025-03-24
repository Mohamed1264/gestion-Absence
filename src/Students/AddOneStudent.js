import { useState } from "react";
import Select from "../LittleComponents/Select";
import { style } from "../Users";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";

import { ToastContainer } from "react-toastify";
import ConfirmAdding from "../LittleComponents/Modals/ConfirmAdding";
import { notify } from "../Functions/Toast";
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";



export default function AddOneStudent ({groups}){
     const [formData,setFormData] = useState({gender:'Male'})
     const [errors,setErrors]= useState({})
     const [isSubmited,setIsSubmited] = useState(false)
     const handleChange = (name,value)=> {
      if (!value.trim()) {
        const newFormData = formData
        delete newFormData[name]
        setFormData(newFormData)
        return false
      }
        setFormData(prev=> ({...prev,[name]:value}))
     }
    

     const InFocus = (name)=>{
       
        const updetedErros = {...errors}
        delete updetedErros[name]
        setErrors(updetedErros)
     }

     const handleError=()=>{
      const nameRegex = /^[A-Za-z]+$/
      const cefRegex  = /^\d+$/
        const failures= {}

          if (!nameRegex.test(formData.name)) failures.name = 'The name should not contain symbols or numbers';
          if (formData.cef && !cefRegex.test(formData.cef)) failures.cef = 'The cef should not contain symbols or letters';
          if (formData.age > 33 || formData.age < 18 ) failures.age = 'The age should be between 18 and 33';
        
        return failures
        
     }
     const handleSubmit = (e)=>{
        e.preventDefault()
        const validation = handleError()
        
        if (Object.keys(validation).length){
            setErrors(validation)
            return false
        }
        setIsSubmited(true)
        

     }


         const config = {
          type : 'group',
          error: errors.group,
          onDelete : InFocus,
          onChange : handleChange,
          defaultValue : formData.group,
          placeholder:'select group'
         }
         
     const handleClick = ()=>{
      notify('student added  seccussfully')
      setIsSubmited(false)
      setFormData({gender:'Male'})
      
   }
    
    
     
    return (
      <>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
          <Container title="Personal Info">
            <FieldContainer title={"CEF"}>
              <input
                type="text"
                name="cef"
                value={formData.cef || ""}
                className={`rounded-r-md px-3 border text-sm font-medium  py-2  outline-none placeholder:text-sm ${
                  style.input
                }    ${errors.cef ? style.errorBorder : style.border} ${
                  style.focusInput
                } `}
                placeholder="Enter student's cef"
                onChange={({ target }) => handleChange("cef", target.value)}
                onFocus={() => InFocus("cef")}
              />
            </FieldContainer>
            <ErrorMsg value={errors.cef} />
            <FieldContainer title={"Full Name"}>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                className={`rounded-r-md px-3 border text-sm font-medium  py-2  outline-none placeholder:text-sm ${
                  style.input
                }  ${errors.name ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter student's full name"
                onChange={({ target }) => handleChange("name", target.value)}
                onFocus={() => InFocus("name")}
              />
            </FieldContainer>
            <ErrorMsg value={errors.name} />
            <FieldContainer title={"Age"}>
              <input
                type="number"
                name="age"
                value={formData.age || ""}
                className={`rounded-r-md px-3 border text-sm font-medium   py-2  outline-none placeholder:text-sm ${
                  style.input
                } ${errors.age ? style.errorBorder : style.border}  ${
                  style.focusInput
                }`}
                placeholder="Enter student's Age"
                onChange={({ target }) => handleChange("age", target.value)}
                onFocus={() => InFocus("age")}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E" || e.key === ".") {
                    e.preventDefault();
                  }
                }}
              />
            </FieldContainer>
            <ErrorMsg value={errors.age} />
            <FieldContainer title={"Gender"}>
              <div
                className={`flex gap-4  ${style.input} ${style.border}  rounded-r-md px-3 border  py-2  flex-1 `}
              >
                <div className="flex items-center  gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={"Male"}
                    checked={formData.gender === "Male"}
                    className="    accent-purple-400 cursor-pointer"
                    onChange={() => handleChange("gender", "Male")}
                  />
                  <label
                    className={` mb-1 text-sm font-medium  text-gray-700 dark:text-gray-50`}
                  >
                    Male{" "}
                  </label>
                </div>
                <div className="flex items-center  gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={"Female"}
                    checked={formData.gender === "Female"}
                    className="  accent-purple-400 cursor-pointer"
                    onChange={() => handleChange("gender", "Female")}
                  />
                  <label
                    className={` mb-1 text-sm font-medium text-gray-700 dark:text-gray-50 `}
                  >
                    Female{" "}
                  </label>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer title={"Group"}>
              <Select
                config={{ ...config, defaultValue: formData.group || "" }}
                items={groups}
              />
            </FieldContainer>
          </Container>
          {/* Submit Button */}
          <SubmitButton
            disabled={Object.keys(formData).length < 5}
            title={"Add Student"}
          />
        </form>
        {isSubmited && (
          <ConfirmAdding
            data={formData}
            setIsSubmited={setIsSubmited}
            handleClick={handleClick}
          />
        )}
      </>
    );
}