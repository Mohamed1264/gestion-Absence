import { useState } from "react";
import Title from "../LittleComponents/Title";
import { TableProvider } from "../Context";
import Table from "../LittleComponents/Table";
import { Fconfig } from "../Configurations";
import { filieres } from "../Users";
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

  return (
    <>
      <Title dataset={filieres} title={"Filières"} link={"/addFiliere"} alerted />

        <Table
          columns={cols}
          data={filieres} // ✅ Pass correct data
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
