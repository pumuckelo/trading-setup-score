import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'

export const Quotes = () => {
  const { quotes } = useSettings()
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [fade, setFade] = useState(true)

  console.log(quotes)
  console.log(currentQuoteIndex)

  useEffect(() => {
    const showQuoteDuration = 10 * 1000 // Show quote for 5 seconds
    const hideQuoteDuration = 120 * 1000 // Hide quote for 10 seconds

    setTimeout(() => setFade(false), showQuoteDuration)

    const interval = setInterval(() => {
      setFade(false)

      // Hide quote after 5 seconds
      setTimeout(() => {
        setFade(true)
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
      }, hideQuoteDuration) // Hide duration
    }, showQuoteDuration + hideQuoteDuration) // Total cycle duration

    return () => clearInterval(interval)
  }, [quotes])

  return (
    <div className="flex items-center justify-center h-7 ">
      <div
        className={`transition-opacity duration-1000 ${
          fade ? 'opacity-100' : 'opacity-0'
        } text-gray-200 text-base text-center italic`}
      >
        {`"${quotes[currentQuoteIndex]}"`}
      </div>
    </div>
  )
}
