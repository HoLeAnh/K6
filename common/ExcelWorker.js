var Excel = require('exceljs');
var path = require('path');

const getWorkbook = async (pathh) => {
    try {
        let wb = new Excel.Workbook();
        let filePath = path.resolve(pathh);
        wb.xlsx.readFile(filePath)
        return await wb.xlsx.readFile(filePath)
    } catch (error) {
        console.log(error)
    }
}

const getSheet = async (wb, sheetName) => {
    try {
        return await wb.getWorksheet(sheetName);
    } catch (error) {
        console.log(error)
    }
}

const getValue = async (sheet, row, column) => {
    try {
        return await sheet.getRow(row).getCell(column).value
    } catch (error) {
        console.log(error)
    }
}

const setValue = async (sheet, row, column, value) => {
    try {
        sheet.getRow(row).getCell(column).value = value
    } catch (error) {
        console.log(error)
    }
}

const writeExcel = async (wb, path) => {
    try {
        wb.xlsx.writeFile(path);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getWorkbook, getSheet, getValue, setValue, writeExcel }