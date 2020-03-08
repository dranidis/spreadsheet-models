namespace SheetLib {

  /**
   * For each spreadsheet that you wish to manipulate
   * you need to create a Sheet object defining the
   * sheet name, columns (as they appear), fields for 
   * accessing the columns. 
   * 
   * Optionally you can define if the sheet is protected and 
   * in that case which in the unprotected range.
   */
  export interface Sheet {
    name: string,
    columns: string[],
    fields: string[],
    hidden?: boolean,
    protected?: boolean,
    unprotectedRange?: string
  }

}