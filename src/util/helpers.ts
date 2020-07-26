export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0

export const lastEl = <T>(arr: T[]) => arr[arr.length - 1]

/**
 * @param start start of array (inclusive)
 * @param stop end of array (exclusive)
 * @returns Array of integers from start to stop.
 * if start >= stop, returns empty array
 */
export const range = (start: number, stop: number): number[] => {
  if (start < stop) {
    return [start, ...range(start + 1, stop)]
  } else {
    return []
  }
}
