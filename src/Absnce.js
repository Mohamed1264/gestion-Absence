import { ExternalLink   , X  } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "./LittleComponents/Pagination";
import SearchBar from "./LittleComponents/SearchBar";
import Table from "./LittleComponents/Table";

// Import data from data.json
import dataA from "./db.json";

const columns = [
  { colName: "ID", accessor: "id" },
  { colName: "Full Name", accessor: "name" },
  { colName: "Group", accessor: "group" },
];

const config = {
  profile: true,
  links: {
    profile: "studentProfile",
    edit: "editStudent",
  },
  resetPassword: true,
  teacherPopUp: true,
  seeAtt: true,
  selects: true,
};

export default function Absence() {
  const { idgroup } = useParams(); // Get idgroup from the URL
  const [dataS, setDataS] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [justifiedStagiaires, setJustifiedStagiaires] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [idg, setIdg] = useState([]); // Define idg in state

  const reasons = ["Sick Leave", "Vacation", "Personal Reasons", "Other"];

  useEffect(() => {
    const filteredData = dataA.absence.filter((absence) => absence.status === "Unjustified");
    const ids = filteredData.map((e) => e.FK_student);
    let stagiaires = dataA.student.filter((s) => ids.includes(s.id_student));
    const idg = [...new Set(stagiaires.map((g) => g.FK_group))];

    // Filter stagiaires by group if idgroup is provided
    if (idgroup) {
      stagiaires = stagiaires.filter((stagiaire) => stagiaire.FK_group.toString() === idgroup);
    }

    setIdg(idg); // Set idg in state

    const updatedDataS = stagiaires.map((stagiaire) => {
      const group = dataA.group.find((e) => e.id_group === stagiaire.FK_group);
      return {
        id: stagiaire.id_student,
        name: `${stagiaire.prenom} ${stagiaire.nom}`,
        group: group ? group.nom_group : "Unknown",
      };
    });

    setDataS(updatedDataS);
  }, [idgroup]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleJustifyAbsence = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one student to justify their absence.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!reason) {
      alert("Please provide a reason.");
      return;
    }

    const updatedAbsences = (dataA.absence || []).map((absence) => {
      if (selectedItems.includes(absence.FK_student)) {
        return { ...absence, status: "Justified" };
      }
      return absence;
    });
    dataA.absence = updatedAbsences; // Corrected assignment

    const justifiedNames = dataS
      .filter((stagiaire) => selectedItems.includes(stagiaire.id))
      .slice(0, 3)
      .map((stagiaire) => stagiaire.name);

    setJustifiedStagiaires(justifiedNames);
    setShowSuccessPopup(true);
    setSelectedItems([]);
    setReason("");
    setIsModalOpen(false);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);

    const updatedDataS = dataS.filter((stagiaire) => !selectedItems.includes(stagiaire.id));
    setDataS(updatedDataS);
  };

  return (
    <div className="w-full  p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4">
      <div
                
                className={`${!idgroup? 'border-purple-600 text-purple-600 dark:border-purple-600' :'border-gray-600  text-dark dark:text-white'} 
                p-0.5 mb-3 cursor-pointer border-b-2 hover:text-purple-600 
                  hover:border-purple-600 dark:hover:border-purple-600 dark:border-gray-600 dark:hover:text-purple-600 transition duration-200`}
              >
                <Link to={`/givePermission`} className="text-ml ">
                  All Groups
                </Link>  
              </div>
              {idg.length > 0 ? (
          dataA.group
            .filter((g) => idg.includes(g.id_group)) // Filter groups by idg
            .map((g, i) => (
              <div
                key={i}
                className={`${g.id_group===idgroup? 'border-purple-600 text-purple-600 dark:border-purple-600' :'border-gray-600  text-dark dark:text-white'} 
                p-0.5 mb-3 cursor-pointer border-b-2 hover:text-purple-600 
                  hover:border-purple-600 dark:hover:border-purple-600 dark:border-gray-600 dark:hover:text-purple-600 transition duration-200`}
              >
                <Link to={`/givePermission/${g.id_group}`} className="text-ml ">
                  {g.nom_group}
                </Link>
                
              </div>
            ))
        ) : (
          <span className="text-gray-600 dark:text-gray-300">No groups available</span>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        {console.log(dataS)}
        <SearchBar data={dataS} columnNames={["name", "group"]} setData={setDataS} />
        <Pagination />
        <button
          onClick={handleJustifyAbsence}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Justify Absence
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={dataS}
        config={config}
        selects
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleCheckboxChange={handleCheckboxChange}
      >
        <Link
          to={"/"}
          className="inline-flex text-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          See More <ExternalLink    size={14} />
        </Link>
      </Table>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-out scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Justify Absences</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X  className="w-6 h-6 text-red-500 hover:text-red-700 transition" />
              </button>
            </div>

            {/* Display selected stagiaires */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Selected Stagiaires:</h3>
              <ul className="list-disc list-inside">
                {dataS
                  .filter((stagiaire) => selectedItems.includes(stagiaire.id))
                  .slice(0, 3)
                  .map((stagiaire) => (
                    <li key={stagiaire.id} className="text-gray-700 dark:text-gray-300">
                      {stagiaire.name}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Reason Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Reason for Absence</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Choose a reason
                </option>
                {reasons.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed bottom-4 right-4 bg-green-200 text-green-800 p-4 rounded-lg shadow-lg">
          <p>
            Successfully justified absence for: <strong>{justifiedStagiaires.join(", ")}</strong>
          </p>
        </div>
      )}
    </div>
  );
}