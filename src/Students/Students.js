
import Table from "../LittleComponents/Table";


import { students } from "../Users";
import Title from "../LittleComponents/Title";
import { Sconfig } from "../Configurations";
import { TableProvider } from "../Context";

const cols = [
  {colName : 'CEF',accessor : 'cef',sortable : true},
  {colName : 'Full Name',accessor : 'name',sortable : true},
  {colName : 'Age',accessor : 'age',sortable : true},
  {colName:'Gender',accessor:'gender',sortable : true},
 { colName : 'Group',accessor : 'group',sortable : true},
 { colName : 'Total Absences',accessor : 'totalAbsences',sortable : true},
 
 
]
export default function Students(){
  

  
  


  return (
      <>
      <Title dataset={students} title={'student'} link={'/addStudent'}/>
      <TableProvider>
              <Table columns={cols} data={students} config={Sconfig}  dropDown={true}/>

      </TableProvider>
      </>

     
    );
  };
