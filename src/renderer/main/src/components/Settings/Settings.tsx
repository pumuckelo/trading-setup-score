import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useSettings } from '../../hooks/useSettings'

export interface SettingsProps {
  goBack: () => void
}

export const Settings = ({ goBack }: SettingsProps) => {
  const {
    scoreDict,
    setScoreDict,
    resetSettings,
    showScore,
    setShowScore,
    saveSettings,
    showTracker,
    setShowTracker
  } = useSettings()

  const handleChange = (e) => {
    const { name, value } = e.target
    setScoreDict({
      ...scoreDict,
      [name]: Number(value)
    })
  }

  const handleToggleShowScore = () => {
    setShowScore(!showScore)
  }

  const handleToggleShowTracker = () => {
    setShowTracker(!showTracker)
  }

  const labels = {
    liquidityInternal: 'Liquidity Internal',
    liquidity15M: 'Liquidity 15 Minutes',
    internalConfirmation: 'Internal Confirmation',
    higherTfD: 'Higher Timeframe Daily',
    higherTfW: 'Higher Timeframe Weekly',
    higherTfM: 'Higher Timeframe Monthly',
    biasPro: 'Bias Pro',
    biasCounter: 'Bias Counter',
    biasNeutral: 'Bias Neutral',
    noLiquidity: 'No Liquidity',
    noHigherTf: 'No Higher Timeframe',
    noInternalConfirmation: 'No Internal Confirmation'
  }

  return (
    <div className="min-h-full h-full w-full text-white relative app-region-no-drag flex flex-col items-start gap-3 ">
      <div className="w-full flex items-center">
        <button
          onClick={goBack}
          className=" text-gray-300 hover:text-white flex items-center mr-auto"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="sm" />
        </button>

        <h1 className=" mx-auto w-full text-center">Settings</h1>
      </div>
      <div className="flex-col flex">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Show Score:</label>
          <input type="checkbox" checked={showScore} onChange={handleToggleShowScore} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Show Trade Tracker:</label>
          <input type="checkbox" checked={showTracker} onChange={handleToggleShowTracker} />
        </div>
        {Object.keys(scoreDict).map((key) => (
          <div
            key={key}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
              // fontSize: '12px'
            }}
          >
            <label style={{ marginRight: '10px' }}>{labels[key]}:</label>
            <input
              type="number"
              name={key}
              value={scoreDict[key]}
              onChange={handleChange}
              style={{ color: 'black', width: '100px' }}
            />
          </div>
        ))}

        <div className="flex-col flex gap-2 mt-2 items-stretch w-3/4 m-auto">
          <button
            onClick={saveSettings}
            style={{
              padding: '4px 8px',
              background: 'white',
              color: 'black',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Settings
          </button>

          <button
            style={{
              padding: '4px 8px',
              background: 'white',
              color: 'black',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={resetSettings}
          >
            Reset Settings
          </button>

          <p style={{ color: '#ffffff94' }} className="font-thin  mt-2 text-center mb-4">
            by mr breakeven
          </p>
        </div>
      </div>
    </div>
  )
}
