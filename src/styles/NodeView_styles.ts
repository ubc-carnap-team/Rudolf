import { createUseStyles } from 'react-jss'

export const rowHeight = '1.5em'
export const rowGap = '.75em'
const columnGap = '.5em'

const nodeviewJSS = createUseStyles({
  TruthTree: {
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

  NodeViewContainer: {
    gridColumn: 'nodeView',
  },

  NodeView: {
    display: 'grid',
    textAlign: 'center',
    columnGap,
    rowGap,
  },

  FormulaBounder: {
    display: 'grid',
    borderRadius: '.2em',
    borderWidth: '.1em',
    borderStyle: 'solid',
    rowGap,
  },

  Tooltip: {
    fontSize: '3em',
  },
})

export default nodeviewJSS
