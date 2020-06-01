import { Check } from '@material-ui/icons'
import React, { FC, Ref, useRef, useState } from 'react'

import { CustomDispatch, updateFormula } from '../RudolfReducer'
import { TreeNode } from '../typings/TreeState'
import { NodeMenu } from './NodeMenu'

interface Props {
  row: number
  value: string
  resolved: boolean
  node: TreeNode
  index: number
  dispatch: CustomDispatch
  canHighlight: boolean
  highlightCount: number
  toggleHighlight: () => void
  incrementHighlight: () => void
  resetHighlight: () => void
  addRow: (row: number) => void
}

const FormulaView: FC<Props> = ({
  index,
  row,
  value,
  resolved,
  dispatch,
  node,
  canHighlight,
  toggleHighlight,
  highlightCount,
  incrementHighlight,
  resetHighlight,
  addRow,
}) => {
  const [contextMenu, setContextMenu] = useState(false) // Convert to reducer action/field w/ ref, node, optional index.
  const [showClass, setShowClass] = useState(false)

  const ref: Ref<HTMLDivElement> = useRef(null)

  function nodeClick() {
    setShowClass(true)
    incrementHighlight()
    addRow(row)
    if (highlightCount === 2) {
      reset()
    }
  }

  function reset() {
    resetHighlight()
    const elements = document.querySelectorAll('div.contradictFormula')

    elements.forEach((element) => {
      element.classList.remove('contradictFormula')
    })
    resetHighlight()
  }

  return (
    <div
      className={showClass ? 'formula node contradictFormula' : 'formula node'}
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu(true)
      }}
      id="nodeDiv"
      onClick={() => (canHighlight ? nodeClick() : console.log('End.'))}
    >
      <span>{row}</span>
      <input
        className="label"
        onChange={(event) =>
          dispatch(updateFormula(node.id, index, event.currentTarget.value))
        }
        value={value}
        placeholder="formula"
      />
      <NodeMenu
        open={contextMenu}
        onClose={() => setContextMenu(false)}
        dispatch={dispatch}
        anchorEl={ref.current as HTMLDivElement}
        index={index}
        node={node}
        formula={{ row, value, resolved }}
        toggleHighlight={toggleHighlight}
      />
      {resolved ? <Check /> : ''}
    </div>
  )
}
export default FormulaView
