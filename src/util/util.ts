export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0

export const isNonEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is T[] => Array.isArray(maybeArray) && maybeArray.length !== 0
