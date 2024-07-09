import { ipcRenderer } from 'electron'
import { ipcCommands } from '@shared/ipcCommands'

import styles from './App.module.css'

function App(): JSX.Element {
  const sendOpenWindowCommand = () => {
    console.log('sendcommand')
    ipcRenderer.invoke(ipcCommands.toggleChecklistVisibility)
  }

  return (
    <>
      <div
        onClick={() => sendOpenWindowCommand()}
        className={styles.circle}
        style={{
          height: '35px',
          width: '35px',
          display: 'relative',
          borderRadius: '8px'

          // borderRadius: '50%'
        }}
      >
        <div
          className={styles.drag}
          style={{
            height: '15px',
            width: '15px',
            borderRadius: '4px',
            background: 'black',
            position: 'absolute',
            top: '0px',
            right: '0px'
          }}
        />
      </div>
    </>
  )
}

export default App
