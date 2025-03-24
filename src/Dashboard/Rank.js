import React from 'react';
import {  Calendar, Clock, XCircle, Clock3 } from 'lucide-react';



const students = [
  {
    id: 1,
    name: "Emma Thompson",
    absenceDays: 12,
    lateDays: 5,
    lastSeen: "2024-03-10",
    totalClasses: 45,
    isAbsentToday: true
  },
  {
    id: 2,
    name: "James Wilson",
    absenceDays: 10,
    lateDays: 3,
    lastSeen: "2024-03-12",
    totalClasses: 45,
    isAbsentToday: false
  },
  {
    id: 3,
    name: "Sophie Chen",
    absenceDays: 8,
    lateDays: 7,
    lastSeen: "2024-03-13",
    totalClasses: 45,
    isAbsentToday: true
  },
  {
    id: 4,
    name: "Michael Brown",
    absenceDays: 7,
    lateDays: 4,
    lastSeen: "2024-03-14",
    totalClasses: 45,
    isAbsentToday: false
  },
  {
    id: 3,
    name: "Sophie Chen",
    absenceDays: 8,
    lateDays: 7,
    lastSeen: "2024-03-13",
    totalClasses: 45,
    isAbsentToday: true
  },
  {
    id: 4,
    name: "Michael Brown",
    absenceDays: 7,
    lateDays: 4,
    lastSeen: "2024-03-14",
    totalClasses: 45,
    isAbsentToday: false
  }
];

const AbsentStudentsRanking = () => {


  return (
    <div className="w-full px-4 mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Top Absent Students</h2>
        <p className="text-gray-600">Students with the highest absence rates</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {students.map((student) => {
          const absencePercentage = (student.absenceDays / student.totalClasses) * 100;
         
          
          return (
            <div key={student.id} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow  border-l-4 border-red-500`}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      {student.name}
                      {student.isAbsentToday && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Absent Today
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-red-500">
                        <XCircle size={16} className="mr-1" />
                        <span className="text-sm">{student.absenceDays} absences</span>
                      </div>
                      <div className="flex items-center text-orange-500">
                        <Clock3 size={16} className="mr-1" />
                        <span className="text-sm">{student.lateDays} lates</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {absencePercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">absence rate</div>
                  </div>
                </div>

                

                <div className="mt-4 flex items-center  text-sm text-gray-600">
                  
                  <div className="flex items-center ">
                    <Clock size={16} className="mr-1" />
                    <span>{student.totalClasses} total classes</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AbsentStudentsRanking;