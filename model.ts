
/**
 * Reads the data from any model sheet. Ignores the heading.
 * Returns an array of objects using the fields as attributes.
 *
 * Stops reading if no values in any field.
 *
 * @param {Sheet} sheetModel
 * @return an array of objects
 */
function getData<T>(sheetModel: Sheet): T[] {
  let sp = SpreadsheetApp.getActive().getSheetByName(sheetModel.sheet);
  let values = sp.getDataRange().getValues();
  let heading = values.shift();
  let entries: T[] = [];
  for (let value of values) {
    let entry: Partial<T> = {};
    var isData = false;

    for (let c = 0; c < value.length; c++) {
      /*
      skip a field if is empty. Used for empty columns in spreadsheet.
      */
      if (sheetModel.fields[c] == "") {
        continue;
      }
      if (value[c] != "") {
        isData = true;
      }
      entry[sheetModel.fields[c]] = value[c];
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
function getRows<T>(sheet: Sheet, firstDataRow = 2): Row<T>[] {
  let i = firstDataRow;
  return getData<T>(sheet).map(function (entry) {
    return { data: entry, row: i++ }
  })
}


/**
 * Creates a spreadsheet given a Sheet model
 * 
 * @param {Sheet} sheetModel 
 */
function createSheet(sheetModel: Sheet) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheetModel.sheet);

  if (sheet == null)
    sheet = ss.insertSheet(sheetModel.sheet);

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
    var protection = sheet.protect().setDescription(sheetModel.sheet + " protection");
    if (sheetModel.unprotected != '') {
      var unprotected = sheet.getRange(sheetModel.unprotected);
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
function fillWithUnderScore(str: string, len: number): string {
  let strLen = str.length;
  for(let i = 0; i < len - strLen; i++) {
    str += "_";
  }
  return str;
}