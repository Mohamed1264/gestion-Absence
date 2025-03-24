import React, { useState, useEffect } from "react";
import data from "../data.json";
import { useParams } from "react-router";

// Helper function to get the start of the week
function getStartOfWeek(date, weekStartsOn = 1) {
  const day = date.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
}

// Helper function to format a date as YYYY-MM-DD
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Function to generate weeks between two dates
function generateWeeks(startDate, endDate) {
  const weeks = [];
  let current = getStartOfWeek(startDate);
  while (current <= endDate) {
    const weekDates = Array.from({ length: 7 }, (_, i) => formatDate(addDays(current, i)));
    weeks.push(weekDates);
    current = addDays(current, 7); // Move to next week
  }
  return weeks;
}

// Helper function to add days to a date
function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export default function AttendancePage() {
  const [weekCards, setWeekCards] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const { groupId } = useParams();

  useEffect(() => {
    const startDate = new Date("2024-09-05"); // Starting date (Sept 5, 2024)
    const endDate = new Date(); // Today's date
    const weeks = generateWeeks(startDate, endDate);
    setWeekCards(weeks);
  }, []);

  const handleCardClick = (weekDates) => {
    setSelectedDate(weekDates);
    setShowTable(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeekCards weekCards={weekCards} onCardClick={handleCardClick} />
          {showTable && <AttendanceTable selectedDate={selectedDate} groupId={groupId} />}
        </div>
      </main>
    </div>
  );
}

function WeekCards({ weekCards, onCardClick }) {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Week Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weekCards.map((weekDates, index) => (
          <div
            key={index}
            onClick={() => onCardClick(weekDates)}
            className="bg-blue-100 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-200 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-blue-800">{weekDates[0]} - {weekDates[6]}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceTable({ selectedDate, groupId }) {
  const group = data.groups.find((g) => g.id === parseInt(groupId, 10));
  if (!group) return <p className="text-center text-red-500">Group not found</p>;

  const stagiaires = data.stagiaires.filter((s) => s.group_id === group.id);
  const sessions = ["S1", "S2", "S3", "S4"];
  const [startDate, endDate] = [new Date(selectedDate[0]), new Date(selectedDate[6])];

  const attendanceForWeek = stagiaires.map((stagiaire) => {
    const absenceRecords = data.absences.filter(
      (record) => record.stagiaire_id === stagiaire.id && new Date(record.date) >= startDate && new Date(record.date) <= endDate
    );
    return { stagiaire, absenceRecords };
  });

  return (
    <div className="bg-white rounded-lg shadow p-8 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendance for {selectedDate[0]} to {selectedDate[6]}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              {sessions.map((session) => (
                <th key={session} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  {session}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceForWeek.map(({ stagiaire, absenceRecords }) => (
              <tr key={stagiaire.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{stagiaire.name}</td>
                {sessions.map((session) => {
                  const record = absenceRecords.find(
                    (a) => a.sessions[session] !== undefined
                  );
                  const isAbsent = record ? record.sessions[session] === true : null;
                  return (
                    <td key={`${stagiaire.id}-${session}`} className="px-2 py-4 text-center text-sm font-semibold">
                      {isAbsent === true ? <span className="text-red-600">A</span> : isAbsent === false ? <span className="text-green-600">P</span> : <span>-</span>}
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
