import React from "react";
import { useParams } from "react-router-dom";
import data from "../db.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// PDF Export Function (unchanged)
const exportTableToPDF = async (start, end, group) => {
  try {
    const input = document.getElementById("absence-table");
    if (!input) throw new Error("Table element not found");
    
    const pdf = new jsPDF("p", "mm", "a4");
    const logo = new Image();

    // Load logo - using a base64 fallback if the image fails to load
    logo.src = "/OFPPT.jpg";
    logo.crossOrigin = "Anonymous";

    // Wait for image to load or fail
    await new Promise((resolve, reject) => {
      logo.onload = resolve;
      logo.onerror = () => {
        console.warn("Logo failed to load, using fallback");
        resolve();
      };
      setTimeout(() => {
        console.warn("Image loading timed out");
        resolve();
      }, 3000);
    });

    // Add header content
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Office de la Formation Professionnelle", 55, 12);
    pdf.setFontSize(10);
    pdf.text(`de ${start} à ${end}`, 150, 25);
    pdf.text(`${group}`, 15, 25);

    if (logo.complete && logo.naturalHeight !== 0) {
      pdf.addImage(logo, "JPEG", 35, 5, 16, 16);
    }

    const canvas = await html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight
    });

    const imgData = canvas.toDataURL("image/png");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);
    pdf.save(`${group}_${start}_to_${end}.pdf`);
    
  } catch (error) {
    console.error("PDF export failed:", error);
    alert(`Failed to generate PDF: ${error.message}`);
  }
};

// Helper functions (unchanged)
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function generateDaysInWeek(startDate, endDate) {
  const days = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);
  
  while (currentDate <= finalDate) {
    days.push(formatDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}

export default function AttendanceList() {
  const { groupId, startDate, endDate } = useParams();

  // Check if the group exists
  const group = data.group.find((g) => g.id_group == Number(groupId));
  if (!group) return <p className="text-center text-red-500">Group not found</p>;

  const selectedDates = generateDaysInWeek(new Date(startDate), new Date(endDate));
  const stagiaires = data.student.filter((s) => s.FK_group == group.id_group);
  const sessions = ["S1", "S2", "S3", "S4"];

  // Get attendance data for the week
  const attendanceForWeek = stagiaires.map((stagiaire) => {
    const absenceRecords = data.absence.filter(
      (record) =>
        record.FK_student === stagiaire.id_student &&
        selectedDates.includes(formatDate(new Date(record.date)))
    );
    return { stagiaire, absenceRecords };
  });

  // Calculate grid template columns
  const gridTemplateColumns = `minmax(150px, 1fr) repeat(${selectedDates.length}, minmax(100px, 1fr))`;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-6 my-2">
      <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 mb-4">
        {group.nom_group || group.nom}
      </h2>
      <h2 className="text-sm text-gray-400 dark:text-gray-500 mb-4">
        {startDate} à {endDate}
      </h2>

      {/* Export Button */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => exportTableToPDF(startDate, endDate, group.nom_group || group.nom)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Export Table PDF
        </button>
      </div>

      {/* Attendance Grid */}
      <div className="overflow-x-auto" id="absence-table">
        <div className="grid rounded-lg border dark:border-gray-700 min-w-[800px]">
          {/* Header Row */}
          <div 
            className="grid items-stretch bg-gray-50 dark:bg-gray-700 rounded-lg "
            style={{ gridTemplateColumns }}
          >
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Name
            </div>
            {selectedDates.map((date, index) => (
              <div 
                key={index} 
                className="px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center"
              >
                <div className="flex flex-col">
                  <span className="text-dark-400 dark:text-gray-300">
                    {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
                  </span>
                  <span className="text-xs text-gray-400">
                    {date.split('-').reverse().join('/')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Student Rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {attendanceForWeek.map(({ stagiaire, absenceRecords }) => (
              <div 
                key={stagiaire.id_student}
                className="grid items-stretch hover:bg-gray-50 dark:hover:bg-gray-700"
                style={{ gridTemplateColumns }}
              >
                {/* Student Name */}
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap flex items-center">
                  {`${stagiaire.nom} ${stagiaire.prenom}`.length > 20
                    ? `${stagiaire.nom} ${stagiaire.prenom}`.substring(0, 20) + "..."
                    : `${stagiaire.nom} ${stagiaire.prenom}`}
                </div>

                {/* Attendance Data */}
                {selectedDates.map((date) => {
                  const record = absenceRecords.find((a) => formatDate(new Date(a.date)) === date);
                  const isAbsent = record?.sessions;

                  return (
                    <div 
                      key={`${stagiaire.id_student}-${date}`} 
                      className="px-2 py-3 text-center flex items-center justify-center"
                    >
                      <div className="flex justify-center gap-1">
                        {sessions.map((session) => {
                          const isSessionAbsent = isAbsent?.[session] === true;

                          return (
                            <span
                              key={session}
                              className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                                isSessionAbsent === null
                                  ? "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  : isSessionAbsent
                                  ? "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                                  : "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                              }`}
                              title={session}
                            >
                              {isSessionAbsent === null ? "-" : isSessionAbsent ? "A" : "P"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}