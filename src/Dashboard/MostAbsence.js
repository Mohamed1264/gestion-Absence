
import { Link } from "react-router-dom";
import { students,groups,filieres } from "../Data/Users";
import { useState } from "react";
function MostAbsence (){
  const infos = {
    'students' : students,
    'groups' : groups,
    'filieres' : filieres
  }
  const liens = {
    'students' : {lien : '/studentProfile' , key :'cef'},
    'groups' : {lien :'/groupProfile',key : 'idGroup'},
    'filieres' : {lien :'/filiereProfile',key : 'idFiliere'}
  }
    const [filterBy,setFilterBy] = useState('students')
    const data = infos[filterBy]
    const link = liens[filterBy]

    return(
      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 my-3  border shadow dark:border-none">
           <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50">Most absent </h3>
                <select onChange={({target})=>setFilterBy(target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/4 p-2.5 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" >
                    <option value={'students'}>By Students</option>
                    <option value={'groups'}>By Groups</option>
                    <option value={'filieres'}>By Filieres</option>
                </select>
           </div>
           <div className="mt-4 grid grid-cols-3 gap-4">
             {
                data.map(
                    d=> <Link to={`${link.lien}/${d[link.key]}`} className="p-3 rounded-md bg-red-50 text-red-700 hover:bg-red-200 dark:bg-red-100" key={d.cef || d.id}>
                        <h2 className=" font-semibold flex items-center justify-between"><span>{d?.name || d?.libel}</span> <span className="text-lg">{d?.totalAbsences || d?.nbrAbsence}</span></h2>
                        <div className="pl-3">
                            <span className=" block text-sm font-medium"> Absences : 20</span>
                            <span className="block text-sm font-medium">Retards : 2</span>
                            <span className="block text-sm font-medium">Today Absence : 0</span>
                            <span className="block text-sm font-medium">Yesterday Absence : 5 </span>
                        </div>
                    </Link>
                )
             }
           </div>
             
        
           
          
               

       </div>
    )
}

export default MostAbsence;