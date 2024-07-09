import { useState, useEffect } from 'react'

const initialScoreDict = {
  liquidityInternal: 10,
  liquidity15M: 20,
  internalConfirmation: 10,
  higherTfD: 15,
  higherTfW: 20,
  higherTfM: 30,
  biasPro: 10,
  biasCounter: -10,
  biasNeutral: 0,
  noLiquidity: -15,
  noHigherTf: -20,
  noInternalConfirmation: -5
}

export const useSettings = () => {
  const [scoreDict, setScoreDict] = useState(initialScoreDict)
  const [showScore, setShowScore] = useState(false)
  const [showTracker, setShowTracker] = useState(true)

  useEffect(() => {
    const storedScoreDict = localStorage.getItem('scoreDict')
    const storedShowScore = localStorage.getItem('showScore')
    const storedShowTracker = localStorage.getItem('showTracker')

    if (storedShowTracker !== null) {
      setShowTracker(JSON.parse(storedShowTracker))
    }

    if (storedScoreDict) {
      setScoreDict(JSON.parse(storedScoreDict))
    }

    if (storedShowScore !== null) {
      setShowScore(JSON.parse(storedShowScore))
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem('scoreDict', JSON.stringify(scoreDict))
    localStorage.setItem('showScore', JSON.stringify(showScore))
    localStorage.setItem('showTracker', JSON.stringify(showTracker))
  }

  const resetSettings = () => {
    setScoreDict(initialScoreDict)
    setShowScore(false)
    setShowTracker(true)
  }

  return {
    scoreDict,
    setScoreDict,
    showScore,
    setShowScore,
    saveSettings,
    resetSettings,
    setShowTracker,
    showTracker
  }
}
