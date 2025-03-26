
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

   

     // const gr = data.group.map((g) => {
      //   const niveau = data.niveaux.find((n) => n.id_niveau === g.FK_niveau)?.nom_niveau || "Unknown";
      //   const filiereGroups = data.filiere.filter((f) => f.id_filiere === g.FK_filiere);
        
      //   return {
      //     id: g.id_group,
      //     libel: g.nom_group,
      //     filiere:filiereGroups,
      //     year: niveau,  
      //     numberStudents: data.
          
      //     numberGroup: filiereGroups.length,
      //     groups: filiereGroups.map((g) => g.nom_group)
      //   };
      // });
    return (
      <>
      <Title dataset={groups} title={"group"} alerted />
            <Table columns={cols} data={groups} config={Gconfig} dropDown={true}/>

 </>
    );
  };
