import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "./Dashboard/SideBar";
import Dashboard from "./Dashboard/Dashboard";
import Students from "./Students/Students";
import Filieres from "./Filiere/Filieres";
import ExportData from "./ExportData";
import AllSchedules from "./Schedule/AllSchedules";
import Absence from "./Absnce";
import Groups from "./Group/Groups";
import AddStudent from "./Students/AddStudent";
import EditStudent from "./Students/EditStudent";
import ProfileStudent from "./Students/ProfileStudent";
import ProfileGroup from "./Group/ProfileGroup";
import ProfileFiliere from "./Filiere/ProfileFiliere";
import { TableProvider } from "./Context";
import AttendancePage from "./Att/AttendancePage";
import AttendanceList from "./Att/AttendanceList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="App font-mainFont">
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex h-full">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={theme} setDarkMode={setTheme} />
          <div className={`p-8 w-full overflow-x-hidden lg:mx-auto ${isOpen ? "lg:ml-[13rem]" : "ml-20 lg:ml-24"}`}>
            <TableProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/filieres" element={<Filieres />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/export" element={<ExportData />} />
                <Route path="/schedule" element={<AllSchedules />} />
                <Route path="/givePermission" element={<Absence />} />
                <Route path="/givePermission/:idgroup" element={<Absence />} />
                <Route path="/attendance/:groupId" element={<AttendancePage />} />
                <Route path="/attendance-list/:groupId/:startDate/:endDate" element={<AttendanceList />} />
                <Route path="/addStudent" element={<AddStudent />} />
                <Route path="/editStudent/:id" element={<EditStudent />} />
                <Route path="/studentProfile/:cef" element={<ProfileStudent />} />
                <Route path="/groupProfile/:id" element={<ProfileGroup />} />
                <Route path="/filiereProfile/:id" element={<ProfileFiliere />} />
              </Routes>
            </TableProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
