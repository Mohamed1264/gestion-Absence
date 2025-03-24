import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// PDF Export Function
const exportTableToPDF = async (start, end, group) => {
  const input = document.getElementById("absence-table");
  const pdf = new jsPDF("p", "mm", "a4");

  // Add logo and school info at the top
  const logo = new Image();
  logo.src = "/OFPPT.jpg";
  logo.onload = async () => {
    pdf.addImage(logo, "JPEG", 35, 5, 16, 16); // Adjusted position

    // School info
    pdf.setFontSize(13);
    pdf.text("Office de la Formation Professionnelle", 55, 12);
    pdf.setFontSize(10);
    pdf.text(`de ${start} à ${end}`, 150, 25);
    pdf.text(` ${group}`, 15, 25);

    // Capture table
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Add table as image
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 27, imgWidth, imgHeight);

    // Save PDF
    pdf.save(`${group}: ${start} à ${end}.pdf`);
  };
};

// Helper function to format a date as YYYY-MM-DD
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Function to generate the days between the start and end dates
function generateDaysInWeek(startDate, endDate) {
  const days = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export default function AttendanceList() {
  const { groupId, startDate, endDate } = useParams();
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Check if the group exists
  const group = data.groups.find((g) => g.id === parseInt(groupId, 10));
  if (!group) return <p className="text-center text-red-500">Group not found</p>;

  const selectedDates = generateDaysInWeek(new Date(startDate), new Date(endDate)); // Generate all the days between start and end date
  const stagiaires = data.stagiaires.filter((s) => s.group_id === group.id);
  const sessions = ["S1", "S2", "S3", "S4"];

  // Get attendance data for the week
  const attendanceForWeek = stagiaires.map((stagiaire) => {
    const absenceRecords = data.absences.filter(
      (record) =>
        record.stagiaire_id === stagiaire.id &&
        new Date(record.date) >= new Date(startDate) &&
        new Date(record.date) <= new Date(endDate)
    );
    return { stagiaire, absenceRecords };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-6">
      <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 mb-4">{group.name}</h2>
      <h2 className="text-sm text-gray-400 dark:text-gray-500 mb-4">{startDate} à {endDate}</h2>

      {/* Export Options */}
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => exportTableToPDF(startDate, endDate, group.name)}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Export Table PDF
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto" id="absence-table">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg table-auto border dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
              {selectedDates.map((date, index) => {
                const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
                return (
                  <th key={index} className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center">
                    <span className="text-dark-400 dark:text-gray-300">{dayName}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {attendanceForWeek.map(({ stagiaire, absenceRecords }) => (
              <tr key={stagiaire.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">{stagiaire.name}</td>
                {selectedDates.map((date) => {
                  const record = absenceRecords.find(
                    (a) => formatDate(new Date(a.date)) === date
                  );
                  const isAbsent = record ? record.sessions : null;
                  return (
                    <td key={`${stagiaire.id}-${date}`} className="px-4 py-3 text-center text-sm font-semibold">
                      <div className="flex justify-center text-xs space-x-2">
                        {sessions.map((session) => {
                          const isSessionAbsent = isAbsent ? isAbsent[session] === true : null;
                          return (
                            <span
                              key={session}
                              className={`px-2 py-1 rounded-md ${
                                isSessionAbsent === null
                                  ? "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  : isSessionAbsent
                                  ? "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                                  : "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                              }`}
                            >
                              {isSessionAbsent === null ? "-" : isSessionAbsent ? "A" : "P"}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
