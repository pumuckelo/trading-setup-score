import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faMinus, faCog } from '@fortawesome/free-solid-svg-icons'
import { ipcRenderer } from 'electron'
import { ipcCommands } from '@shared/ipcCommands'
import { useSettings } from '../../hooks/useSettings'
import { Tracker } from '../Tracker'
import { Quotes } from '../Quotes'

const getGrade = (score) => {
  if (score >= 70) return { score: 'A+++', color: 'text-green-600' }
  if (score >= 60) return { score: 'A++', color: 'text-green-500' }
  if (score >= 50) return { score: 'A+', color: 'text-green-400' }
  if (score >= 40) return { score: 'A', color: 'text-green-300' }
  if (score >= 30) return { score: 'B', color: 'text-yellow-300' }
  if (score >= 20) return { score: 'C', color: 'text-yellow-400' }
  if (score >= 10) return { score: 'D', color: 'text-red-300' }
  return { score: 'F', color: 'text-red-400' }
}

export interface ChecklistProps {
  openSettings: () => void
}

export const Checklist = ({ openSettings }: ChecklistProps) => {
  const { scoreDict, showScore, showTracker, showQuotes } = useSettings()

  const [liquidityInternal, setLiquidityInternal] = useState(false)
  const [liquidity15M, setLiquidity15M] = useState(false)
  const [internalConfirmation, setInternalConfirmation] = useState(false)
  const [higherTfD, setHigherTfD] = useState(false)
  const [higherTfW, setHigherTfW] = useState(false)
  const [higherTfM, setHigherTfM] = useState(false)
  const [bias, setBias] = useState('')

  const resetForm = () => {
    setLiquidityInternal(false)
    setLiquidity15M(false)
    setInternalConfirmation(false)
    setHigherTfD(false)
    setHigherTfW(false)
    setHigherTfM(false)
    setBias('')
  }

  const calculateScore = () => {
    let score = 0
    score += liquidityInternal ? scoreDict.liquidityInternal : 0
    score += liquidity15M ? scoreDict.liquidity15M : 0
    score += internalConfirmation ? scoreDict.internalConfirmation : 0
    score += higherTfD ? scoreDict.higherTfD : 0
    score += higherTfW ? scoreDict.higherTfW : 0
    score += higherTfM ? scoreDict.higherTfM : 0
    score +=
      bias === 'Pro'
        ? scoreDict.biasPro
        : bias === 'Counter'
          ? scoreDict.biasCounter
          : scoreDict.biasNeutral

    if (!liquidityInternal && !liquidity15M) score += scoreDict.noLiquidity
    if (!higherTfD && !higherTfW && !higherTfM) score += scoreDict.noHigherTf
    if (!internalConfirmation) score += scoreDict.noInternalConfirmation
    return score
  }

  const score = calculateScore()
  const grade = getGrade(score)

  const minimizeWindow = () => {
    ipcRenderer.invoke(ipcCommands.toggleChecklistVisibility)
  }

  return (
    <div className="app-region-no-drag">
      <div className="absolute top-4 right-0 m-4 mt-0 flex gap-4 items-center app-region-no-drag">
        <button
          onClick={openSettings}
          className="text-gray-300 hover:text-white flex items-center p-1"
        >
          <FontAwesomeIcon icon={faCog} size="sm" />
        </button>
        <button
          onClick={minimizeWindow}
          className="text-gray-300 hover:text-white flex items-center  p-1"
        >
          <FontAwesomeIcon icon={faMinus} size="sm" />
        </button>
        <button
          onClick={resetForm}
          className=" text-gray-300 cursor-pointer hover:text-white flex items-center p-1"
        >
          <FontAwesomeIcon icon={faRedo} size="sm" />
        </button>
      </div>
      <h3 className="font-light ">Liquidity:</h3>
      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={liquidityInternal}
            onChange={() => setLiquidityInternal(!liquidityInternal)}
            className="form-checkbox text-gray-300"
          />
          <span className="ml-2 font-light">Internal</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            checked={liquidity15M}
            onChange={() => setLiquidity15M(!liquidity15M)}
            className="form-checkbox text-gray-300"
          />
          <span className="ml-2 font-light">15 M</span>
        </label>
      </div>

      <h3 className="font-light ">Internal Confirmation:</h3>
      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={internalConfirmation}
            onChange={() => setInternalConfirmation(!internalConfirmation)}
            className="form-checkbox text-gray-300"
          />
        </label>
      </div>

      <h3 className="font-light ">Higher tf lvl:</h3>
      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={higherTfD}
            onChange={() => setHigherTfD(!higherTfD)}
            className="form-checkbox text-gray-300"
          />
          <span className="ml-2 font-light">D</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            checked={higherTfW}
            onChange={() => setHigherTfW(!higherTfW)}
            className="form-checkbox text-gray-300"
          />
          <span className="ml-2 font-light">W</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            checked={higherTfM}
            onChange={() => setHigherTfM(!higherTfM)}
            className="form-checkbox text-gray-300"
          />
          <span className="ml-2 font-light">M</span>
        </label>
      </div>

      <h3 className="font-light ">Bias:</h3>
      <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="bias"
            checked={bias === 'Pro'}
            onChange={() => setBias('Pro')}
            className="form-radio text-gray-300"
          />
          <span className="ml-2 font-light">Pro</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            name="bias"
            checked={bias === 'Counter'}
            onChange={() => setBias('Counter')}
            className="form-radio text-gray-300"
          />
          <span className="ml-2 font-light">Counter</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            name="bias"
            checked={bias === 'Neutral'}
            onChange={() => setBias('Neutral')}
            className="form-radio text-gray-300"
          />
          <span className="ml-2 font-light">Neutral</span>
        </label>
      </div>

      {showScore && (
        <div className="flex gap-2 items-center justify-between mt-4">
          <h3 className="font-light ">Setup Score</h3>
          <p className={`${grade.color} text-3xl font-light`}>
            {grade.score} ({score})
          </p>
        </div>
      )}

      {showTracker && (
        <div className="mt-4">
          <Tracker />
        </div>
      )}

      {showQuotes && (
        <div className="mt-4">
          <Quotes />
        </div>
      )}
    </div>
  )
}
