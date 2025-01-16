import { useEffect, useState } from 'react'
    import { CandleData } from '../types'
    import { fetchCandles } from '../api'

    export const useStockData = (selectedTicker: string) => {
      const [candles, setCandles] = useState<CandleData[]>([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)

      useEffect(() => {
        let interval: NodeJS.Timeout
        
        const fetchData = async () => {
          try {
            setLoading(true)
            const { data, error } = await fetchCandles(selectedTicker)
            
            if (error) {
              setError(error)
            } else {
              setCandles(data)
              setError(null)
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
          } finally {
            setLoading(false)
          }
        }

        if (selectedTicker) {
          fetchData() // Initial fetch
          interval = setInterval(fetchData, 60000) // Fetch every 60 seconds
        }

        return () => {
          if (interval) {
            clearInterval(interval)
          }
        }
      }, [selectedTicker])

      return { candles, loading, error }
    }
