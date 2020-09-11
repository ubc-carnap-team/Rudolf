import { createUseStyles } from 'react-jss'

const appJSS = createUseStyles({
  AppBounder: {
    color: 'black',
    fontSize: 'calc(8px + 1.5vmin)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1em',
  },

  TopItemsBounder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  TreeBounder: {
    borderStyle: 'solid',
    borderWidth: '.1em',
    borderRadius: '.2em',
    '&::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
    },
    maxWidth: '80vw',
    overflowX: 'scroll',
  },
})

export default appJSS
