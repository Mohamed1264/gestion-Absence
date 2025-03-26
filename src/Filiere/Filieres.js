import { useState } from "react";
import Title from "../LittleComponents/Title";
import Table from "../LittleComponents/Table";
import { Fconfig } from "../Configurations";
import data from "../db.json"
import DropDownMenu from "../LittleComponents/DropDownMenu"; // Import DropDownMenu

export default function Filieres() {
  // ✅ Track selected item (filière)
  const [selectedItem, setSelectedItem] = useState(null);

  const cols = [
    { colName: "Label", accessor: "libel", sortable: true },
    { colName: "Level", accessor: "niveau", sortable: true },
    { colName: "Number of Groups", accessor: "numberGroup", sortable: true },
    { colName: "Groups", accessor: "groups", sortable: false },
  ];
  
  const fil = data.filiere.map((f) => {
    const niveau = data.niveau.find((n) => n.id_niveau === f.FK_niveau)?.nom_niveau || "Unknown";
    const filiereGroups = data.group.filter((g) => g.FK_filiere === f.id_filiere);
  
    return {
      id: f.id_filiere,
      libel: f.nom_filiere,
      niveau: niveau,  // Now a string, not an array
      numberGroup: filiereGroups.length,
      groups: filiereGroups.map((g) => g.nom_group)
    };
  });
  
  

  return (
    <>
      <Title dataset={fil} title={"Filières"} link={"/addFiliere"} alerted />

        <Table
          columns={cols}
          data={fil} // ✅ Pass correct data
          config={Fconfig}
          dropDown={true} // ✅ Enable dropdown
          item={selectedItem}
          setItem={setSelectedItem} // ✅ Pass setSelectedItem correctly
        >
          {(item) => (
            <DropDownMenu item={item} setSelectedItem={setSelectedItem} selectedItem={selectedItem}>
              <button className="text-blue-500 hover:underline">See More</button>
            </DropDownMenu>
          )}
        </Table>
    </>
  );
}
