



import Table from "../LittleComponents/TableComponents/Table";
import { TableProvider } from "../TableContext";
import { students } from "../Users";


const config = {
  name : 'yesterdayAbsent',
  searchBy : ['cef','name'],
  filterBy : ['group','totalAbsence'],
  resetPassword : false,
  dropDown : false,
  links:{
    profile : 'studentProfile',

  },
  action:true,
  columns : [
    {colName:'Cef',accessor:'cef',sortable : true},
    {colName:'Full Name',accessor:'name',sortable : true},
    {colName:'Group',accessor:'group',sortable : true},
    {colName:'Total Absence',accessor:'totalAbsence',sortable : true},
    {colName:'Yesterday Absence',accessor:'yesterdayAbsence',sortable : true},
    {colName:'Is absent Today',accessor:'isAbsentToday',sortable : true},
  ]
}


export default function YesterdayAbsence({data}){
  
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-3  my-5 dark:border-none">
              <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50"> Yesterday Absence </h3>
              <TableProvider>
              <Table  dataset={students} config={config} />


              </TableProvider>
</div>



    )
}