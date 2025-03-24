import { useParams } from "react-router-dom"

import { students } from "../Users"
import SearchBar from "../LittleComponents/SearchBar"
import Pagination from "../LittleComponents/Pagination"
import { useState } from "react"
import { studentAbsenceRecords } from "../Users"
import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"

const dataa = [
 
    {
        name : 'Absences',
        total : 31,
        justified : 5,
        notJustified : 26
    },
    {
        name : 'retards',
        total : 5,
        justified : 1,
        notJustified : 4
    }
 
]


export default function ProfileStudent(){
    const [data,setData]=useState(studentAbsenceRecords)
    const {cef} =useParams()
    const student = students.find(student => student.cef === cef)
    const cols = [
        {colName : 'CEF',accessor : 'cef'},
        {colName : 'Full Name',accessor : 'name'},
        {colName : 'Age',accessor : 'age'},
        {colName:'Gender',accessor:'gender'},
       { colName : 'Group',accessor : 'group'},

       
       
      ]
    return (
        <div className=" select-none">
        {/* title */}
            <div>
                <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in { student?.name} profile</h1>
                
            </div>



            {/* Infos */}
            <div className="flex min-w-full gap-5">



                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-2 pt-4 flex-1">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Student Info</h3>
                     <div>
                     <Infos info={cols} item={student}/>
                    
            
                     </div>
                </div>



                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Student Absence Info</h3>
                    <select  class="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" >
                        <option value={'All time'}>All time</option>
                        <option value={'Today'}>Today</option>
                        <option value={'Yesterday'}>Yesterday</option>
                        <option value={'Last week'}>Last Week</option>
                        <option value={'Last month'}>Last Month</option>
                    </select>
                    <HChart data={dataa}/>
                  
                          
                    
                    
                </div>
              
                
               

            </div>



{/* absence Records Table */}
            <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-4 flex-1 bg-white dark:bg-gray-800 flex items-center justify-center mt-8">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">All absence records</h3>

                    <div class=" min-w-full max-w-5xl inline-block align-middle rounded-lg border divide-y divide-gray-100 relative dark:divide-gray-500 dark:border-gray-500 mt-3">
                            <div className="p-1.5 flex items-center justify-between">
                                <SearchBar data={students} setData={setData} columnNames={['date']}/>
                                
                                <Pagination />
                            </div>
                            
                            <table className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
        
                
                    <th  scope="col" className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>Date</th>
                    <th  scope="col" className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>Status</th>
                    <th  scope="col" className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>Justified</th>
                
            
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
          {
            studentAbsenceRecords.map((t,index) =>
                <tr className={`hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600 `} key={index}>
                    <td className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">{t.date}</td>
                    <td className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">
                   
                    <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${t.status === 'Absent' ? 'bg-red-200 text-red-900 border-red-600 dark:bg-red-200' : "bg-yellow-200 text-yellow-900 border-yellow-600 "}`}>{t.status}</span>
                    </td>
                    <td className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">
                   
                    <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${t.justified  ? 'bg-green-200 text-green-900 border-green-600 dark:bg-green-200' : "bg-yellow-200 text-yellow-900 border-yellow-600 "}`}> {t.justified ? 'Yes' : 'No' }</span>
                    </td>
                </tr>
          )}
            
          </tbody>
        </table>

                        
                    </div>      
                                                
                                                
            </div>
        </div>
    )
}









    