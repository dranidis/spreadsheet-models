/// <reference path="sheet.ts" />
namespace SheetLib {

  /**
   * Reads the data from any model sheet. Ignores the heading.
   * Returns an array of objects using the fields as attributes.
   *
   * Stops reading if no values in any field.
   *
   * @param {Sheet} sheet
   * @return an array of objects
   */
  export function getData<T>(sheet: Sheet): T[] {
    let sp = SpreadsheetApp.getActive().getSheetByName(sheet.name);
    if (sp === null) {
      throw new Error('Spreadsheet not found');
    }
    let values = sp.getDataRange().getValues();
    values.shift();
    let entries: T[] = [];
    for (let value of values) {
      let entry: any = {};
      var isData = false;

      for (let c = 0; c < value.length; c++) {
        /*
        skip a field if is empty. Used for empty columns in spreadsheet.
        */
        if (sheet.fields[c] == "") {
          continue;
        }
        if (value[c] != "") {
          isData = true;
        }
        entry[sheet.fields[c]] = value[c];
      }
      if (!isData) {
        break;
      }
      entries.push(entry as T);
    }
    return entries;
  }

  /**
   * getRows<T> returns the entries in the sheet as
   * an array of objects of type T.
   * By default is starts reading on the 2nd row.
   *
   * @param {Sheet} sheet
   * @param {number} firstDataRow First row of data (default 2)
   * @return an array of objects
   */
  export function getRows<T>(sheet: Sheet, firstDataRow = 2): Row<T>[] {
    let i = firstDataRow;
    return getData<T>(sheet).map(
      entry => { return { data: entry, row: i++ }; }
    )
  }


  /**
   * Appends a single row of data
   * 
   * @param sheetModel 
   * @param data 
   */
  export function appendRow<T>(sheetModel: Sheet, data: T): void {
    let ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(sheetModel.name);

    if (sheet == null) {
      throw new Error(`The spreadsheet with the name ${sheetModel.name} does not exist`);
    }

    sheet.appendRow(Object.keys(data).map(key => (<any>data)[key]));
  }

  /**
   * Appends many rows
   * 
   * @param sheetModel 
   * @param rows 
   */
  export function appendRows<T>(sheetModel: Sheet, rows: T[]): void {
    if (rows.length == 0) {
      return;
    }

    let ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(sheetModel.name);

    if (sheet == null) {
      throw new Error(`The spreadsheet with the name ${sheetModel.name} is not created`);
    }

    let dataValues = rows.map(row =>
      Object.keys(row).map(key => (<any>row)[key])
    );

    sheet.getRange(sheet.getLastRow() + 1, 1, dataValues.length, dataValues[0].length).setValues(dataValues);
  }

  /**
   * Updates a row in the spreadsheet
   * 
   * @param sheetModel 
   * @param row 
   */
  export function updateRow<T>(sheetModel: Sheet, row: Row<T>): void {
    let ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(sheetModel.name);

    if (sheet == null) {
      throw new Error(`The spreadsheet with the name ${sheetModel.name} is not created`);
    }

    let values = Object.keys(row.data).map(key => (<any>row.data)[key]);
    sheet.getRange(row.row, 1, 1, values.length).setValues([values]);
  }

  /**
   * Creates a spreadsheet given a Sheet model
   * 
   * @param {Sheet} sheetModel 
   */
  export function createSheet(sheetModel: Sheet) {
    let ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(sheetModel.name);

    if (sheet == null)
      sheet = ss.insertSheet(sheetModel.name);

    if (sheetModel.hidden)
      sheet.hideSheet();

    if (sheetModel.columns.length > 0) {
      sheet.getRange(1, 1, 1, sheetModel.columns.length)
        .setValues([sheetModel.columns])
        .setBackground("black")
        .setFontWeight("bold")
        .setFontColor("white");

      sheet.autoResizeColumns(1, sheetModel.columns.length)
    }

    if (sheetModel.protected) {
      var protection = sheet.protect().setDescription(sheetModel.name + " protection");
      if (sheetModel.unprotectedRange && sheetModel.unprotectedRange != '') {
        var unprotected = sheet.getRange(sheetModel.unprotectedRange);
        protection.setUnprotectedRanges([unprotected]);
      }
      protection.setWarningOnly(true);
    }
  }

  /**
   * Returns a string of lenght len containing the initial str argument
   * and the rest of the string filled with _.
   * If the lenght is less than the length of the original,
   * returns the original string.
   *
   * @param str original string
   * @param len lenght of returned string
   */
  export function fillWithUnderScore(str: string, len: number): string {
    let strLen = str.length;
    for (let i = 0; i < len - strLen; i++) {
      str += "_";
    }
    return str;
  }

}