import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportAsPdf = (columnNames, sortedData, getValues, fileName) => {
  try {
    // Create PDF document
    const doc = new jsPDF();

    // Add header text
    doc.setFontSize(16);
    doc.text("OFPPT", 10, 15);
    doc.setFontSize(12);
    doc.text("Adresse: Hay elhassani, Dakhla", 10, 22);
    doc.text("Téléphone: +212 612345678", 10, 29);
    doc.text("Email: contact@ofppt.ma", 10, 36);

    // Prepare table data
    const tableData = sortedData.map(item => {
      const values = getValues(item);
      return columnNames.map((col, index) => values[index] || "");
    });

    // Add table
    doc.autoTable({
      head: [columnNames],
      body: tableData,
      startY: 40,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "auto" }
      }
    });

    // Save PDF locally with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fullFileName = `${fileName}_${timestamp}.pdf`;
    doc.save(fullFileName);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    alert("Error exporting to PDF. Please try again.");
  }
}; 