import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
type TrackedTrade = {
  id: string
  result: 'win' | 'loss' | 'breakeven'
  time: Date
}

export const Tracker = () => {
  const [trackedTrades, setTrackedTrades] = useState<TrackedTrade[]>([])

  const addWin = () => {
    setTrackedTrades([...trackedTrades, { id: uuidv4(), result: 'win', time: new Date() }])
  }

  const addLoss = () => {
    setTrackedTrades([...trackedTrades, { id: uuidv4(), result: 'loss', time: new Date() }])
  }

  const addBreakeven = () => {
    setTrackedTrades([...trackedTrades, { id: uuidv4(), result: 'breakeven', time: new Date() }])
  }

  const removeTrade = (id: string) => {
    setTrackedTrades(trackedTrades.filter((trade) => trade.id !== id))
  }

  const resetTrades = () => {
    setTrackedTrades([])
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <button
            onClick={addWin}
            className="w-5 h-5 text-xs siz border-none bg-green-400 rounded-full hover:bg-green-600 transition "
          >
            W
          </button>
          <button
            onClick={addLoss}
            className="w-5 h-5 text-xs border-none bg-red-400 hover:bg-red-600 rounded-full transition "
          >
            L
          </button>
          <button
            onClick={addBreakeven}
            className="w-5 h-5 text-xs border-none bg-blue-400 hover:bg-blue-600 transition rounded-full"
          >
            B
          </button>
        </div>
        <button
          onClick={resetTrades}
          className=" text-gray-300 cursor-pointer hover:text-white flex items-center p-1"
        >
          <FontAwesomeIcon icon={faRedo} size="xs" />
        </button>
      </div>

      {trackedTrades.length ? (
        <div className="flex gap-1 border border-white border-1 p-1 rounded-md w-full flex-wrap">
          {trackedTrades.map((trade, i) => (
            <div
              onClick={() => removeTrade(trade.id)}
              key={trade.id}
              className={`hover:opacity-50 transition w-4 h-4 text-xs border-none rounded-full text-white text-center flex justify-center items-center  ${
                trade.result === 'win'
                  ? 'bg-green-400'
                  : trade.result === 'loss'
                    ? 'bg-red-400'
                    : 'bg-blue-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
