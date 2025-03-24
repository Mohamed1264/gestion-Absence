import React, { useState } from "react";
import data from "../db.json";
import GroupSchedule from "./GroupSchedule";

export default function AllSchedules() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  
  const groups = data.group;
  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Groups Schedules</h1>

        {/* Input Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Date Picker */}
            <input
              type="date"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Group Selector */}
            <select
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedGroup || ""}
              onChange={(e) => setSelectedGroup(e.target.value || undefined)}
            >
              <option value="">All Groups</option>
              {groups.map((group) => (
                <option key={group.id_group} value={group.id_group}>
                  {group.nom_group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedules Section */}
        <div className="space-y-4">
          {!selectedGroup
            ? groups.map((group) => (
               <div 
               key={group.id_group}
               className="relative my-10 border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800 shadow">
                <h3 className="absolute text-gray-700 dark:text-gray-50 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 -top-4 left-4 rounded-md">
                {group.nom_group}
                </h3>
                  <GroupSchedule id_group={group.id_group} date={selectedDate || today} />
                </div>
              ))
            : (
              <div className="relative my-10 border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800 shadow">
                <h3 className="absolute text-gray-700 dark:text-gray-50 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 -top-4 left-4 rounded-md">
                {data.group.find((g) => g.id_group === Number(selectedGroup)).nom_group}
                </h3>
                  <GroupSchedule id_group={Number(selectedGroup)} date={selectedDate || today} />
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
