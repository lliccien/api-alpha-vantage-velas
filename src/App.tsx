import { useState, useEffect } from 'react'
    import { Chart } from './components/Chart'
    import { TickerSelector } from './components/TickerSelector'
    import { useStockData } from './hooks/useStockData'
    import { fetchTickers } from './api'

    const STORAGE_KEY = 'selectedTicker'

    const App = () => {
      const [selectedTicker, setSelectedTicker] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || 'SPY'
      })
      const [tickers, setTickers] = useState<StockTicker[]>([])
      
      const { candles, loading, error } = useStockData(selectedTicker)

      useEffect(() => {
        const loadTickers = async () => {
          const { data } = await fetchTickers()
          setTickers(data)
        }

        loadTickers()
      }, [])

      useEffect(() => {
        if (selectedTicker) {
          localStorage.setItem(STORAGE_KEY, selectedTicker)
        }
      }, [selectedTicker])

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Stock Market Visualizer</h1>
          
          <div className="mb-4">
            <TickerSelector
              tickers={tickers}
              selectedTicker={selectedTicker}
              onSelect={setSelectedTicker}
            />
          </div>

          {loading && <div className="text-center">Loading...</div>}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {!loading && !error && selectedTicker && (
            <div className="mt-4">
              <Chart data={candles} />
            </div>
          )}
        </div>
      )
    }

    export default App
