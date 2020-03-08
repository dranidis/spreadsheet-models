"use strict";
/// <reference path="sheet.ts" />
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/// <reference path="sheet.ts" />
var SheetLib;
(function (SheetLib) {
    /**
     * Reads the data from any model sheet. Ignores the heading.
     * Returns an array of objects using the fields as attributes.
     *
     * Stops reading if no values in any field.
     *
     * @param {Sheet} sheet
     * @return an array of objects
     */
    function getData(sheet) {
        var e_1, _a;
        var sp = SpreadsheetApp.getActive().getSheetByName(sheet.name);
        if (sp === null) {
            throw new Error('Spreadsheet not found');
        }
        var values = sp.getDataRange().getValues();
        values.shift();
        var entries = [];
        try {
            for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var value = values_1_1.value;
                var entry = {};
                var isData = false;
                for (var c = 0; c < value.length; c++) {
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
                entries.push(entry);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1["return"])) _a.call(values_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return entries;
    }
    SheetLib.getData = getData;
    /**
     * getRows<T> returns the entries in the sheet as
     * an array of objects of type T.
     * By default is starts reading on the 2nd row.
     *
     * @param {Sheet} sheet
     * @param {number} firstDataRow First row of data (default 2)
     * @return an array of objects
     */
    function getRows(sheet, firstDataRow) {
        if (firstDataRow === void 0) { firstDataRow = 2; }
        var i = firstDataRow;
        return getData(sheet).map(function (entry) { return { data: entry, row: i++ }; });
    }
    SheetLib.getRows = getRows;
    /**
     * Appends a single row of data
     *
     * @param sheetModel
     * @param data
     */
    function appendRow(sheetModel, data) {
        var ss = SpreadsheetApp.getActive();
        var sheet = ss.getSheetByName(sheetModel.name);
        if (sheet == null) {
            throw new Error("The spreadsheet with the name " + sheetModel.name + " does not exist");
        }
        sheet.appendRow(Object.keys(data).map(function (key) { return data[key]; }));
    }
    SheetLib.appendRow = appendRow;
    /**
     * Appends many rows
     *
     * @param sheetModel
     * @param rows
     */
    function appendRows(sheetModel, rows) {
        if (rows.length == 0) {
            return;
        }
        var ss = SpreadsheetApp.getActive();
        var sheet = ss.getSheetByName(sheetModel.name);
        if (sheet == null) {
            throw new Error("The spreadsheet with the name " + sheetModel.name + " is not created");
        }
        var dataValues = rows.map(function (row) {
            return Object.keys(row).map(function (key) { return row[key]; });
        });
        sheet.getRange(sheet.getLastRow() + 1, 1, dataValues.length, dataValues[0].length).setValues(dataValues);
    }
    SheetLib.appendRows = appendRows;
    /**
     * Updates a row in the spreadsheet
     *
     * @param sheetModel
     * @param row
     */
    function updateRow(sheetModel, row) {
        var ss = SpreadsheetApp.getActive();
        var sheet = ss.getSheetByName(sheetModel.name);
        if (sheet == null) {
            throw new Error("The spreadsheet with the name " + sheetModel.name + " is not created");
        }
        var values = Object.keys(row.data).map(function (key) { return row.data[key]; });
        sheet.getRange(row.row, 1, 1, values.length).setValues([values]);
    }
    SheetLib.updateRow = updateRow;
    /**
     * Creates a spreadsheet given a Sheet model
     *
     * @param {Sheet} sheetModel
     */
    function createSheet(sheetModel) {
        var ss = SpreadsheetApp.getActive();
        var sheet = ss.getSheetByName(sheetModel.name);
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
            sheet.autoResizeColumns(1, sheetModel.columns.length);
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
    SheetLib.createSheet = createSheet;
    /**
     * Returns a string of lenght len containing the initial str argument
     * and the rest of the string filled with _.
     * If the lenght is less than the length of the original,
     * returns the original string.
     *
     * @param str original string
     * @param len lenght of returned string
     */
    function fillWithUnderScore(str, len) {
        var strLen = str.length;
        for (var i = 0; i < len - strLen; i++) {
            str += "_";
        }
        return str;
    }
    SheetLib.fillWithUnderScore = fillWithUnderScore;
})(SheetLib || (SheetLib = {}));
/**
 * Necessary declarations so that GAS library
 * exposes the function to the client.
 */
var getData = SheetLib.getData;
var appendRow = SheetLib.appendRow;
var appendRows = SheetLib.appendRows;
var updateRow = SheetLib.updateRow;
var createSheet = SheetLib.createSheet;
var fillWithUnderScore = SheetLib.fillWithUnderScore;
var getRows = SheetLib.getRows;
/** BEGIN index.ts */
/**
 * Here the triple slash directives allow to specify order
 * in which files get added to the output
 */
/// <reference path="lib/sheet.ts" />
/// <reference path="lib/row.ts" />
/// <reference path="lib/model.ts" />
/// <reference path="lib/declarations.ts" />
// other files in tsconfig scope (`files` and `include`) will be added past this point
/** END index.ts */
