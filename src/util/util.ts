export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0
