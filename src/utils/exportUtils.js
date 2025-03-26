import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToPDF = (data, columns, options = {}) => {
  const doc = new jsPDF("p", "mm", "a4");
  
  // Add OFPPT logo from public folder
  try {
    const logoUrl = '/OFPPT.jpg';
    doc.addImage(logoUrl, 'JPEG', 15, 10, 30, 15); // x, y, width, height
  } catch (e) {
    console.warn("Could not load logo:", e);
  }

  // Header text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Office de la Formation Professionnelle", 55, 18); // Adjusted y-position

  // Table configuration
  doc.autoTable({
    head: [columns.map(c => c.colName)],
    body: data.map(row => columns.map(col => row[col.accessor] ?? "-")),
    startY: 35, // Increased to account for logo
    styles: { 
      fontSize: 9,
      halign: 'center',
      valign: 'middle',
      fillColor: 255, // White background
      textColor: 0,   // Black text
      lineColor: 0,   // Black borders
      lineWidth: 0.2
    },
    headStyles: { 
      fillColor: 255, // White header background (changed from gray)
      textColor: 0,   // Black header text
      lineColor: 0,
      lineWidth: 0.2,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fillColor: 255, // White body background
      textColor: 0,   // Black text
      lineColor: 0,   // Black borders
      lineWidth: 0.2
    },
    columnStyles: {
      '__all__': {
        cellWidth: 'wrap',
        lineColor: 0
      }
    },
    tableLineColor: 0,
    tableLineWidth: 0.2
  });

  doc.save(`${options.fileName || "report"}_${new Date().toISOString().slice(0,10)}.pdf`);
};
// Excel Export
export const exportToExcel = (data, columns, options = {}) => {
  const ws = XLSX.utils.json_to_sheet(data.map(row => 
    columns.reduce((obj, col) => ({ ...obj, [col.colName]: row[col.accessor] }), {})
  ));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, options.sheetName || "Sheet1");
  XLSX.writeFile(wb, `${options.fileName || "data"}_${new Date().toISOString().slice(0,10)}.xlsx`);
};

// JSON Export
export const exportToJSON = (data, options = {}) => {
  const blob = new Blob([JSON.stringify(data, null, options.prettyPrint ? 2 : 0)], { type: "application/json" });
  saveAs(blob, `${options.fileName || "data"}_${new Date().toISOString().slice(0,10)}.json`);
};

// Unified Export
export const exportData = {
  pdf: exportToPDF,
  excel: exportToExcel,
  json: exportToJSON,
  to: (format, data, columns = [], options = {}) => exportData[format]?.(data, columns, options)
};