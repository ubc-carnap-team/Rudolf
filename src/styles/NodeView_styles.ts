import { createUseStyles } from 'react-jss'

export const rowHeight = '1.5em'
export const rowGap = '.75em'
const columnGap = '.5em'

const nodeviewJSS = createUseStyles({
  NodeViewBaseContainer: {
    display: 'grid',
    padding: '0.2em',
    gridTemplateColumns:
      '[rowNumber] auto [nodeView] auto [justification] auto',
    placeItems: 'center',
    columnGap,
    rowGap,
  },

  RowNumber: {
    gridColumn: 'rowNumber',
  },

  Justification: {
    gridColumn: 'justification',
    display: 'flex',
    alignSelf: 'start',
  },

  NodeView: {
    display: 'grid',
    textAlign: 'center',
    columnGap,
    rowGap,
  },

  FormulaBounder: {
    display: 'grid',
    rowGap,
  },

  Correct: {
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'green',
  },
  Incorrect: {
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'red',
  },
  Tooltip: {
    fontSize: '3em',
  },
})

export default nodeviewJSS
