import { useState } from 'react'

import { Checklist } from './components/Checklist/Checklist'
import { Settings } from './components/Settings/Settings'

function App(): JSX.Element {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      {/* <div className="w-full overflow-hidden border-r-8"> */}
      <div
        className={`p-5 h-full w-full text-white relative  overflow-y-auto flex flex-col justify-stretch ${showSettings ? 'app-region-no-drag' : 'app-region-drag'}`}
      >
        {showSettings ? (
          <Settings goBack={() => setShowSettings(false)} />
        ) : (
          <Checklist openSettings={() => setShowSettings(true)} />
        )}
      </div>
      {/* </div> */}
    </>
  )
}

export default App
