/** ActionCreator function interface with actual action type name */
export interface ImmerActionCreator<ActionTypeType, Payload extends any[]> {
  readonly type: ActionTypeType

  (...args: Payload): {
    type: ActionTypeType
    payload: FirstOrAll<Payload>
  }
}

/**
 * Get the first value of tuple when the tuple length is 1 otherwise return the
 * whole tuple
 */
type FirstOrAll<T> = T extends [infer V] ? V : T
