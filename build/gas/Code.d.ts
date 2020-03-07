declare namespace SheetLib {
    interface Sheet {
        sheet: string;
        columns: string[];
        fields: string[];
        hidden?: boolean;
        protected?: boolean;
        unprotected?: string;
    }
}
declare namespace SheetLib {
    /**
     * Reads the data from any model sheet. Ignores the heading.
     * Returns an array of objects using the fields as attributes.
     *
     * Stops reading if no values in any field.
     *
     * @param {Sheet} sheetModel
     * @return an array of objects
     */
    function getData<T>(sheetModel: Sheet): T[];
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
declare namespace SheetLib {
    interface Row<T> {
        data: T;
        row: number;
    }
}
