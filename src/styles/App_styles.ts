import { createUseStyles } from 'react-jss'

const appJSS = createUseStyles({
  AppBounder: {
    background: '#ffffff',
    textAlign: 'center',
    color: 'black',
    fontSize: 'calc(10px + 2vmin)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },

  TopItemsBounder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  TreeBounder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80vw',
    height: '70vh',
    position: 'absolute',
    borderColor: 'black',
    borderStyle: 'solid',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
    },
  },

  Tree: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translate(max(-50%, -40vw), 0px)',
  },
})

export default appJSS
