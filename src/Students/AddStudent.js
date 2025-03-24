import {  User } from "lucide-react";
import { useState } from "react";

import Alert from "../LittleComponents/Alert";
import { groups } from "../Users";


import AddOneForm from "./AddOneForm";
import AddManyForm from "./AddManyForm";


const activeStyle = 'border-b-purple-600 text-purple-600';
const desactiveStyle = 'border-b-gray-200 text-gray-200 dark:border-b-gray-600 dark:text-gray-600'


export default function AddStudent(){
   
   
    const [addMethod,setAddMethod] = useState('add one')
    
    

  
     
    return (
        <>
        <div className="mb-5 mt-3 flex items-center gap-3 text-gray-700 dark:text-gray-50">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl font-bold ">Add new student</h1>
        </div>
        {/* form */}
        <div className="flex items-center justify-center gap-1 mb-4">
           <button onClick={()=>setAddMethod('add one')}  className={`  border-b-2  px-3 py-1     ${addMethod === 'add one' ? activeStyle : desactiveStyle}`}>Add one Student</button>
           <button onClick={()=>setAddMethod('add many')}  className={`  border-b-2  px-3 py-1     ${addMethod === 'add many' ? activeStyle : desactiveStyle}`}>Import many Students</button>
        </div>
        {
          addMethod === 'add one' ? 
          <AddOneForm groups={groups}/>
        :
        <AddManyForm groups={groups}/>
        
        }




        </>
      
    )
}