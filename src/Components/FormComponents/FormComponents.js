import Select from "../Select"
import { Calendar, CalendarFold, Eye, EyeOff, Lock } from 'lucide-react';
import { AlertCircle } from "lucide-react";
import { useState } from "react";
export  const Form = ({
  submitFunction,
  submitBtnTitle ,
  submitBtnIsDisabled,
  children ,
  maxWidth = 'md:max-w-sm', 
  isIncludeSubmitBtn = true
}) =>{
  return (
      <form className={`max-w-full  mx-auto px-2 md:px-0  ${maxWidth}`} onSubmit={submitFunction}>
          {children}
          <div className="flex justify-end">
          {
              isIncludeSubmitBtn &&
              <SubmitButton
                  disabled={submitBtnIsDisabled}
                  title={submitBtnTitle}
              />
          }

          </div>
         
          
      </form>
  )
}

//component for showing the error message
export const ErrorMsg  = ({value}) => {
  return  value ?  <span className="my-1 w-full text-xs font-semibold text-red-600">{value}</span> : null
}

// the container of the input, the label and the error message
const  FieldContainer = ( { label,children, error}) => { 
    return (
      
            <div className="w-full mt-6">
                <div className="relative">
                <span className=" px-1 mb-2 block  text-sm font-medium text-gray-700 dark:text-gray-50 ">
                        {label}
                    </span>
                    {children}
                    
                </div>
                <ErrorMsg value={error} />
            </div>
    )
}

export const TextField = ({error, handleChange ,handleFocus ,value , name , placeHolder ,label ,type = 'text',icon:Icon})=>{
     return (
        <FieldContainer label={label} error={error}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className={`h-5 w-5 ${error ? 'text-red-600' : 'text-gray-300 dark:text-gray-600  '} `} />
                </div>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className={`
                    bg-gray-100/70 dark:bg-gray-800/70 
                          block pl-10 px-4 py-2 w-full   appearance-none   rounded-lg 
                          text-gray-700 dark:text-gray-50 
                          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600  '} 
                          focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                          placeholder:text-gray-300 dark:placeholder:text-gray-600
                      `}
                    placeholder={placeHolder}
                    onChange={({ target }) => handleChange(name, target.value)}
                    onFocus={() => handleFocus(name)}
                />
                
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    { error && <AlertCircle className="h-5 w-5 text-red-500" /> }
                </div>
            </div>
        </FieldContainer>
     )
}

export const PasswordField = ({error, handleChange ,handleFocus ,value , name , placeHolder ,label,})=>{
  const [showPassword, setShowPassword] = useState(false);
  return (
     <FieldContainer label={label} error={error}>
             <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Lock className={`h-5 w-5 ${error ? 'text-red-600' : 'text-gray-300 dark:text-gray-600  '}`} />
  </div>
         <input
             type={showPassword ? 'text':'password'}
             name={name}
             value={value}
             className={`
             bg-gray-100/70 dark:bg-gray-800/70 
                   block pl-10 pr-14 py-2 w-full   appearance-none   rounded-lg 
                   text-gray-700 dark:text-gray-50 
                   border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600  '}
                   focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                   placeholder:text-gray-300 dark:placeholder:text-gray-600
               `}
             placeholder={placeHolder}
             onChange={({ target }) => handleChange(name, target.value)}
             onFocus={() => handleFocus(name)}
           />
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
               <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-50 transition-colors duration-200"
    >
    {
      !value ? null : showPassword   ? 
        <EyeOff className="h-5 w-5" />
       : 
        <Eye className="h-5 w-5" />
      
    }
      
    </button>
    </div>

      </div>

     </FieldContainer>
  )
}

export const SelectField = ({label ,handleChange , placeholder ,name , value,items}) =>{
    return (
        <FieldContainer label={label}>
             <select
                value={value}
                onChange={({target}) => handleChange(name,target.value)}
                className={`
                bg-gray-100/70 dark:bg-gray-800/70
                block px-4 py-2 w-full appearance-none  rounded-lg 
                ${value ? ' text-gray-700 dark:text-gray-50 ' : 'text-gray-300 dark:text-gray-600'}
               
                border border-gray-300 dark:border-gray-600 
                focus:outline-none focus:ring-0 focus:border-purple-600 dark:focus:border-purple-600`}
              >
                <option value="" disabled selected className="text-gray-300 dark:text-gray-600">{placeholder}</option>
                {
                    items.map (item =>  
                    <option key={item} className="text-gray-700 dark:text-gray-50" value={item}>
                      {item}
                    </option>
                    )
                }
              </select>
        </FieldContainer>
    )
}

export const RatioField = ({value, name ,handleChange , label,items}) =>{
    return (
       <FieldContainer label={label}>
            <div className="flex items-center gap-4 py-2">
                {
                    items.map (item =>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={name}
                          checked={value === item}
                          onChange={() => handleChange(name,item)}
                          className="w-4 h-4  border-gray-300  accent-purple-600 "
                        />
                        <span className="text-gray-700 dark:text-gray-50">{item}</span>
                      </label>    
                    )
                }
                  
            </div>
       </FieldContainer>
    )
}

export const CustomSelect = ({items,label , name , handleChange , value , placeholder})=>{
     const config = {
        name : name, 
        items : items,
        onChange : handleChange,
        placeholder : placeholder,
        defaultValue : value     
     }
    return (
        <FieldContainer label={label}>
            <Select config={config}/>

        </FieldContainer>
        
    )
}

export const NumberField = ({name,value,handleChange,handleFocus,placeholder,error,label})=>{
  return (
    <FieldContainer label={label} error={error}>
       <input
                  type="number"
                  name={name}
                  value={value}
                  className={`
                    bg-gray-100/70 dark:bg-gray-800/70 
                      block px-4 py-2 w-full rounded-lg appearance-none
                    text-gray-700 dark:text-gray-50 
                      border ${error ? 'border-red-600' : 'border-gray-300 dark:border-gray-600  '}
                      focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                    placeholder:text-gray-300 dark:placeholder:text-gray-600
                  `}
                  placeholder={placeholder}
                  onChange={({ target }) => handleChange("age", target.value)}
                  onFocus={() => handleFocus("age")}
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === ".") {
                      e.preventDefault();
                    }
                  }}
                />
    </FieldContainer>
  )
}

export const DateField = ({name,value,handleChange,error,label,handleFocus}) => {
    return (
      <FieldContainer label={label} error={error}>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarFold className={`h-5 w-5  ${error ? 'text-red-600' : 'text-gray-300 dark:text-gray-600  '}`} />
            </div>
            <input
                type="date"
                name ={name}
                value={value}
                onChange={({target}) => handleChange(name,target.value)}
                onFocus={()=>handleFocus(name)}
                max={new Date('20/10/2004')}
                className={`
                block outline-none w-full 
                text-gray-700 dark:text-gray-50 border 
                bg-gray-100/70 dark:bg-gray-800/70 
                rounded-md pl-10 pr-3 py-2   
                 ${error ? 'border-red-500' :'border-gray-300 dark:border-gray-600  '}
                `}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {error && <AlertCircle className="h-5 w-5 text-red-500" /> }
            </div>
        </div>
    </FieldContainer>
    )
}

export const DateRangeInput =({startDate,endDate,handleChange,}) =>{

  return (
    <div className={`flex flex-col space-y-2  `}>
      <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-50">
        <div className="flex-1">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
            Start Date 
          </label>
          <div className="relative">
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={({target}) => handleChange('start_date',target.value)}
              max={endDate}
              className="block outline-none w-full border bg-gray-100 dark:bg-gray-900 rounded-md border-gray-300 dark:border-gray-600  focus:ring-1 focus:border-purple-600 focus:ring-purple-600 pl-10 pr-3 py-2"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-gray-600" />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={({target}) => handleChange('end_date',target.value)}
              min={startDate}
              className="block outline-none w-full border bg-gray-100 dark:bg-gray-900 rounded-md border-gray-300 dark:border-gray-600 focus:right-1  focus:border-purple-600 focus:ring-purple-600 pl-10 pr-3 py-2"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Switch = ({ checked, handleChange, label ,name}) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer ">
   
    <div
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
    
    >
      <div
        className={`absolute top-1 left-1 size-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
    <span className="text-gray-700 dark:text-gray-50 text-sm font-semibold select-none">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={()=>handleChange(name , !checked)}
      className="hidden"
    />
  </label>
  );
}

export  const SubmitButton = ({disabled,title}) => {
  return (
      <button 
          type="submit" 
          disabled={disabled}
          className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-50"
      >
          {title}
      </button>
  )
}

