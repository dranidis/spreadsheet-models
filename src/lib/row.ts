/// <reference path="sheet.ts" />

namespace SheetLib {

  export interface Row<T> {
    data: T,
    row: number
  }

}