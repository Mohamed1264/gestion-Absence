import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportAsExcel = (name, columnNames, sortedData, setExportDropDown, fileName, getValues) => {
  try {
    // Create worksheet data
    const worksheetData = sortedData.map(item => {
      const values = getValues(item);
      return columnNames.reduce((obj, col, index) => {
        obj[col] = values[index];
        return obj;
      }, {});
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, name);

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Save file locally
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fullFileName = `${fileName}_${timestamp}.xlsx`;
    saveAs(excelFile, fullFileName);
    
    // Close dropdown
    setExportDropDown(false);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    alert("Error exporting to Excel. Please try again.");
  }
}; 