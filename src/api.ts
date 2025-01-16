
    import { CandleData, StockTicker, ApiResponse } from './types'

    const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart'

    const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp * 1000)
      return date.toISOString().split('T')[0]
    }

    export const fetchCandles = async (
      symbol: string,
      interval: string = '1d',
      range: string = '1mo'
    ): Promise<ApiResponse<CandleData[]>> => {
      try {
        const response = await fetch(
          `${BASE_URL}/${symbol}?interval=${interval}&range=${range}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        const result = data.chart.result[0]
        if (!result) {
          throw new Error('Invalid data format from API')
        }

        const timestamps = result.timestamp || []
        const quotes = result.indicators.quote[0] || {}

        const candles: CandleData[] = timestamps.map((timestamp: number, index: number) => ({
          time: formatDate(timestamp),
          open: quotes.open?.[index] || 0,
          high: quotes.high?.[index] || 0,
          low: quotes.low?.[index] || 0,
          close: quotes.close?.[index] || 0,
          volume: quotes.volume?.[index] || 0
        })).filter(candle => candle.time && candle.close > 0)

        return { data: candles }
      } catch (error) {
        return { data: [], error: error instanceof Error ? error.message : 'Unknown error' }
      }
    }

    export const fetchTickers = async (): Promise<ApiResponse<StockTicker[]>> => {
      try {
        const popularTickers: StockTicker[] = [
          // Top 20 ETFs
          { symbol: 'SPY', name: 'SPDR S&P 500 ETF', exchange: 'NYSE ARCA' },
          { symbol: 'IVV', name: 'iShares Core S&P 500 ETF', exchange: 'NYSE ARCA' },
          { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', exchange: 'NYSE ARCA' },
          { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', exchange: 'NYSE ARCA' },
          { symbol: 'QQQ', name: 'Invesco QQQ Trust', exchange: 'NASDAQ' },
          { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets ETF', exchange: 'NYSE ARCA' },
          { symbol: 'IEFA', name: 'iShares Core MSCI EAFE ETF', exchange: 'NYSE ARCA' },
          { symbol: 'VWO', name: 'Vanguard FTSE Emerging Markets ETF', exchange: 'NYSE ARCA' },
          { symbol: 'AGG', name: 'iShares Core U.S. Aggregate Bond ETF', exchange: 'NYSE ARCA' },
          { symbol: 'VTV', name: 'Vanguard Value ETF', exchange: 'NYSE ARCA' },
          { symbol: 'IJR', name: 'iShares Core S&P Small-Cap ETF', exchange: 'NYSE ARCA' },
          { symbol: 'IWM', name: 'iShares Russell 2000 ETF', exchange: 'NYSE ARCA' },
          { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', exchange: 'NASDAQ' },
          { symbol: 'XLF', name: 'Financial Select Sector SPDR Fund', exchange: 'NYSE