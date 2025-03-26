import { useEffect, useState } from "react";
import Table from "../LittleComponents/Table";
import Title from "../LittleComponents/Title";
import { Sconfig } from "../Configurations";
import { TableProvider } from "../Context";
import data from "../db.json";

function getStudentAbsenceData(db) {
  const formatDate = (date) => date.toISOString().split('T')[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return db.student.map(student => {
    const absences = db.absence
      .filter(a => a.FK_student === student.id_student)
      .map(a => new Date(a.date_absence))
      .sort((a, b) => a - b);

    // Calculate absence periods
    const periods = [];
    let currentPeriod = null;

    absences.forEach(date => {
      date.setHours(0, 0, 0, 0);
      if (!currentPeriod) {
        currentPeriod = { start: date, end: date };
      } else {
        const nextDay = new Date(currentPeriod.end);
        nextDay.setDate(nextDay.getDate() + 1);
        
        if (date.getTime() === nextDay.getTime()) {
          currentPeriod.end = date;
        } else {
          periods.push(currentPeriod);
          currentPeriod = { start: date, end: date };
        }
      }
    });

    if (currentPeriod) periods.push(currentPeriod);

    // Format periods for display
    const formattedPeriods = periods.map(p => ({
      from: formatDate(p.start),
      to: formatDate(p.end),
      days: Math.floor((p.end - p.start) / (86400000)) + 1
    }));

    // Create display strings
    const periodStrings = formattedPeriods.map(p => 
      `${p.from} to ${p.to} (${p.days} day${p.days > 1 ? 's' : ''})`
    );

    const latestPeriod = formattedPeriods.length > 0 
      ? formattedPeriods[formattedPeriods.length - 1]
      : null;

    return {
      id: student.id_student,
      cef: `S${student.id_student.toString().padStart(3, '0')}`,
      name: `${student.nom} ${student.prenom}`,
      isAbsentToday: absences.some(d => formatDate(d) === formatDate(today)) ? 'Yes' : 'No',
      latestAbsence: latestPeriod 
        ? `${latestPeriod.from} to ${latestPeriod.to} (${latestPeriod.days} day${latestPeriod.days > 1 ? 's' : ''})`
        : 'None',
      allAbsences: data.absence.filter(a=> a.FK_student= student.id_student).length
    };
  });
}

const cols = [
  { colName: 'CEF', accessor: 'cef', sortable: true },
  { colName: 'Name', accessor: 'name', sortable: true },
  { colName: 'Currently Absent', accessor: 'isAbsentToday', sortable: true },
  { colName: 'Latest Absence', accessor: 'latestAbsence' },
  { colName: 'All Absences', accessor: 'allAbsences' }
];

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentData = getStudentAbsenceData(data);
    setStudents(studentData);
  }, []);

  return (
    <>
      <Title 
        dataset={students} 
        title="Student Absences" 
        link="/addStudent" 
      />
      <TableProvider>
        <Table
          columns={cols}
          data={students}
          config={Sconfig}
          dropDown={true}
        />
      </TableProvider>
    </>
  );
}