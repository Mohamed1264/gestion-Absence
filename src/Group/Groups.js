
import Title from "../LittleComponents/Title";
import Table from "../LittleComponents/Table";
import { Gconfig } from "../Configurations";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";
import { groups } from "../Users";
import data from '../db.json';
import { TableProvider } from "../Context";
export default function Filieres(){
  console.log(data.group);
    const cols = [
      {colName:'Libel',accessor : 'libel',sortable : true},
      {colName:'Filiere',accessor : 'filiere',sortable : true},
      {colName:'Year',accessor : 'year',sortable : true},
      {colName:'Number students',accessor : 'numberStudents',sortable : true},
      {colName:'Total Absence',accessor : 'totalAbsence',sortable : true},
      {colName:'Today Absence',accessor : 'todayAbsence',sortable : true},
    ]
    return (
      <>
      <Title dataset={groups} title={"group"} alerted />
            <Table columns={cols} data={groups} config={Gconfig} dropDown={true}/>

 </>
    );
  };
