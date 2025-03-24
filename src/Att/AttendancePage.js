import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../db.json";
import { useParams } from "react-router-dom";
// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Generate weeks from Monday to Saturday between two dates
function generateWeeks(startDate, endDate) {
  const weeks = [];
  let currentStart = new Date(startDate);

  while (currentStart <= endDate) {
    const week = [];
    for (let i = 0; i < 6; i++) { // 6 days: Monday to Saturday
      const currentDay = new Date(currentStart);
      currentDay.setDate(currentStart.getDate() + i);
      week.push(formatDate(currentDay));
    }
    weeks.push(week);
    currentStart.setDate(currentStart.getDate() + 7); // Move to the next week (skip Sunday)
  }

  return weeks;
}

export default function AttendancePage() {
  const [groupName, setGroupName] = useState("");
  const [weekCards, setWeekCards] = useState([]);
  const navigate = useNavigate();
  const {groupId} =useParams()
   
  // Assuming groupId is passed to this page, fetch group name from data
  useEffect(() => {
    const group =data.group?  data.group.find(g=>g.id_group=groupId):[];
    console.log(group);
    // You can adjust this based on groupId passed or user selection
    setGroupName(group.nom_group);
  }, []);

  useEffect(() => {
    const startDate = new Date("2024-09-02");
    const endDate = new Date();
    const weeks = generateWeeks(startDate, endDate);
    setWeekCards(weeks);
  }, []);

  // Handle click on week card to go to attendance list
  const handleCardClick = (weekDates) => {
    const [startDate, endDate] = [weekDates[0], weekDates[5]]; // Updated to get Saturday as endDate
    navigate(`/attendance-list/1/${startDate}/${endDate}`); // Assuming groupId is 1, replace as needed
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Group: {groupName}</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Week Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {weekCards.map((weekDates, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(weekDates)}
                  className="bg-blue-100 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                >
                  <h3 className="text-lg  text-blue-800">
                    {weekDates[0]}  {weekDates[5]}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
