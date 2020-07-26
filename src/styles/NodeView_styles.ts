import { createUseStyles } from 'react-jss'

export const rowHeight = '1.5em'
export const rowGap = '3vmin'
const columnGap = '3vmin'

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
})

export default nodeviewJSS
