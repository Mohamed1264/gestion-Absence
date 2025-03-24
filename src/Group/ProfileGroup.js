import { Link, useParams } from "react-router-dom"
import { PenBox, Trash2, UserX2,Users } from "lucide-react"
import { groups,students } from "../Users"
import GroupSchedule from "../Schedule/GroupSchedule"


import Table from "../LittleComponents/Table"


import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"
import ProfileCards from "../LittleComponents/ProfileCards"
import { TableProvider } from "../Context"


const  cardsData = [
    {
      title:'Total Absence ',
      nbr: 20,
      icon : <UserX2 size={36}/>,
      

     
    },
    {
      title:'Total Students',
      nbr: 21,
      icon : <Users size={36}/>,
    
      
    },
    {
      title:'Today Absence',
      nbr: 4,
      icon : <UserX2 size={36}/>,
     
   
    },
    
    {
      title:'Yesterday Absence',
      nbr: 0,
      icon : <UserX2 size={36}/>,
      
    },
    
   
  ]


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
const dataa2= [
    {
        name : 'Male',
        retard :20,
        absence : 10
    },
    {
        name : 'Female',
        retard :1,
        absence : 1
    },
]
const totalAbsence = dataa2.reduce((acc,val)=> acc + val.absence , 0)
const totalRetard = dataa2.reduce((acc,val)=> acc + val.retard , 0)
export default function ProfileGroup(){
    const cols = [
        {colName : 'CEF',accessor : 'cef',sortable : true},
        {colName : 'Full Name',accessor : 'name',sortable : true},
        {colName : 'Age',accessor : 'age',sortable : true},
        {colName:'Gender',accessor:'gender',sortable : true},
       { colName : 'Group',accessor : 'group',sortable : true},
       { colName : 'Total Absences',accessor : 'totalAbsences',sortable : true},
       
       
      ]
      const config = {
        name : 'student',
        searchBy : ['cef','name','group','age'],
        resetPassword : false,
        dropDown : true,
        profile : true,
        links:{
          profile : 'studentProfile',
          edit:'editStudent'
        }
      }


 
  


    const {id} =useParams()
    const group = groups.find(student => student.id === Number(id))
    const infos = [
        {colName:'Libel',accessor : 'libel'},
        {colName:'Filiere',accessor : 'filiere'},
        {colName:'Year',accessor : 'year'},

    ]

    
    return (
        <div className=" select-none">
            <div>
                <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in { group.libel} profile</h1>
               
                
            </div>
            <div className=" flex min-w-full gap-5 mb-10">
            <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-2 pt-4 flex-1">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Info</h3>
                     <Infos info={infos} item={group}/>
                     <div className="flex items-center justify-center gap-3 my-7">
                        <Link to={`/editGroup/${group.id}`} className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"><PenBox size={20}/> Edit</Link>
                        <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800  focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" ><Trash2 size={20}/> Delete</button>
                     </div>
            </div>

            <div className="  grid grid-cols-2  gap-6  ">
                        <ProfileCards cardsInfo={cardsData}/>
                        
                    </div>
            </div>
             {/* Group Schedule */}
            <div className="relative my-10 border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-900 shadow">
                <h3 className="absolute text-gray-700 dark:text-gray-50 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 -top-4 left-4 rounded-md">
                Group Schedule
                </h3>
                {console.log(typeof(id))
                }
                <GroupSchedule id_group={id} />
            </div>
            <div className="flex min-w-full my-10 gap-5">
                
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence Info</h3>
                    <select  className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" >
                        <option value={'All time'}>All time</option>
                        <option value={'Today'}>Today</option>
                        <option value={'Yesterday'}>Yesterday</option>
                        <option value={'Last week'}>Last Week</option>
                        <option value={'Last month'}>Last Month</option>
                    </select>
                    <HChart data={dataa} />
                     
                </div>

                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5  py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-between w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence by gender</h3>   
                    <select  className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" >
                        <option value={'All time'}>All time</option>
                        <option value={'Today'}>Today</option>
                        <option value={'Yesterday'}>Yesterday</option>
                        <option value={'Last week'}>Last Week</option>
                        <option value={'Last month'}>Last Month</option>
                    </select>
                    <div className="flex flex-col gap-5  ">
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-red-500 dark:bg-red-200 rounded-md "></span>
                            <span className="text-red-500 dark:text-red-200  text-sm font-semibold">Absence</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-orange-400 dark:bg-orange-200 rounded-md "></span>
                            <span className="text-orange-400 dark:text-orange-200  text-sm font-semibold">Retard</span>
                        </div>
                    </div>

                    <div className=" p-3  flex items-center justify-end gap-10  w-full h-4/5 ">
                            {dataa2.map((d, index) => (
                                
                                
                                <div key={index} className=" flex flex-col space-y-2  justify-end items-center  h-full  " >
                            

                                    <div className=" flex items-end gap-2 duration-150 h-full "  >
                                      {d.absence !== 0 && <div className="bg-red-500 items-center justify-center flex dark:bg-red-200 rounded-md w-16 text-lg font-bold text-gray-50 dark:text-red-700 min-h-5" style={{ height: `${d.absence * 100 / totalAbsence}%`}} >
                                         { d.absence}
                                      </div>}
                                     {d.retard !== 0 && <div className="bg-orange-400 flex items-center justify-center dark:bg-orange-200 rounded-md w-16 text-lg font-bold text-gray-50 dark:text-orange-700 min-h-5" style={{ height: `${d.retard * 100 / totalRetard}%`}} >
                                         {d.retard }
                                      </div>}

                                    </div>
                                    <div className="h-12 flex justify-center items-center">
                                        <span className="text-center uppercase text-sm font-semibold text-gray-700 dark:text-gray-50">{d.name}</span>
                                    </div>   
                                </div>
                                
                            ))}
                            
                    </div>
                </div>
            </div>
            <TableProvider>
                            <Table columns={cols} dataset={students} config={config}/>
            </TableProvider>
        </div>
    )
}