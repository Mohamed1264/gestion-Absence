import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



// 📌 Export to JSON
export const exportToJSON = (data) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "table_data.json";
  document.body.appendChild(link);
  link.click();
};
// utils/exportUtils.js




export const exportToPDF = (data, columns) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("Aucune donnée à exporter !");
    return;
  }
  if (!Array.isArray(columns) || columns.length === 0) {
    alert("Aucune colonne définie !");
    return;
  }

  const doc = new jsPDF();
  const logoUrl = `${window.location.origin}/OFPPT.jpg`; // Access logo from public folder

  const imgWidth = 30;
  const imgHeight = 30;

  const reader = new FileReader();

  fetch(logoUrl)
    .then((res) => res.blob())
    .then((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const logoBase64 = reader.result;

        // 🏫 School Info and Logo
        doc.addImage(logoBase64, "JPEG", 10, 10, imgWidth, imgHeight);
        doc.setFontSize(16);
        doc.text(" OFPPT", 50, 15);
        doc.setFontSize(12);
        doc.text("Adresse: Hay elhassani , Dakhla", 50, 22);
        doc.text("Téléphone: +212 612345678", 50, 29);
        doc.text("Email: contact@ofppt.ma", 50, 36);

        doc.setFontSize(18);

        let y = 60;

        // 🟣 Table Header
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        columns.forEach((col, index) => {
          const x = 10 + index * 50;
          doc.text(String(col.colName), x, y);
        });

        y += 10;
        doc.setFont(undefined, "normal");

        // 🟡 Table Data
        data.forEach((row) => {
          columns.forEach((col, index) => {
            const value = row[col.accessor] !== undefined ? String(row[col.accessor]) : "";
            const x = 10 + index * 50;
            doc.text(value, x, y);
          });
          y += 10;

          // If the page height limit is reached, add a new page
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
        });

        // 💾 Save the PDF
        doc.save("rapport.pdf");
      };
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du logo :", error);
      alert("Impossible de charger le logo pour le PDF !");
    });
};






// 📌 Export to Excel
export const exportToExcel = (data, columns) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((row) =>
      Object.fromEntries(columns.map((col) => [col.colName, row[col.accessor]]))
    )
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelFile = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(excelFile, "table_data.xlsx");
};
