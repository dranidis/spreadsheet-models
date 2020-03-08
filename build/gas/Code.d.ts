declare namespace SheetLib {
    /**
     *  For each spreadsheet that you wish to manipulate
     * you need to create a Sheet object defining the
     * sheet name, columns (as they appear), fields for
     * accessing the columns.
     *
     * Optionally you can define if the sheet is proteced and
     * in that case which in the unprotected range.
     */
    interface Sheet {
        name: string;
        columns: string[];
        fields: string[];
        hidden?: boolean;
        protected?: boolean;
        unprotectedRange?: string;
    }
}
declare namespace SheetLib {
    interface Row<T> {
        data: T;
        row: number;
    }
}
declare namespace SheetLib {
    /**
     * Reads the data from any model sheet. Ignores the heading.
     * Returns an array of objects using the fields as attributes.
     *
     * Stops reading if no values in any field.
     *
     * @param {Sheet} sheet
     * @return an array of objects
     */
    function getData<T>(sheet: Sheet): T[];
    /**
     * getRows<T> returns the entries in the sheet as
     * an array of objects of type T.
     * By default is starts reading on the 2nd row.
     *
     * @param {Sheet} sheet
     * @param {number} firstDataRow First row of data (default 2)
     * @return an array of objects
     */
    function getRows<T>(sheet: Sheet, firstDataRow?: number): Row<T>[];
    /**
     * Appends a single row of data
     *
     * @param sheetModel
     * @param data
     */
    function appendRow<T>(sheetModel: Sheet, data: T): void;
    /**
     * Appends many rows
     *
     * @param sheetModel
     * @param rows
     */
    function appendRows<T>(sheetModel: Sheet, rows: T[]): void;
    /**
     * Updates a row in the spreadsheet
     *
     * @param sheetModel
     * @param row
     */
    function updateRow<T>(sheetModel: Sheet, row: Row<T>): void;
    /**
     * Creates a spreadsheet given a Sheet model
     *
     * @param {Sheet} sheetModel
     */
    function createSheet(sheetModel: Sheet): void;
    /**
     * Returns a string of lenght len containing the initial str argument
     * and the rest of the string filled with _.
     * If the lenght is less than the length of the original,
     * returns the original string.
     *
     * @param str original string
     * @param len lenght of returned string
     */
    function fillWithUnderScore(str: string, len: number): string;
}
/**
 * Necessary declarations so that GAS library
 * exposes the function to the client.
 */
declare let getData: typeof SheetLib.getData;
declare let appendRow: typeof SheetLib.appendRow;
declare let appendRows: typeof SheetLib.appendRows;
declare let updateRow: typeof SheetLib.updateRow;
declare let createSheet: typeof SheetLib.createSheet;
declare let fillWithUnderScore: typeof SheetLib.fillWithUnderScore;
declare let getRows: typeof SheetLib.getRows;
/** BEGIN index.ts */
/**
 * Here the triple slash directives allow to specify order
 * in which files get added to the output
 */
/** END index.ts */
