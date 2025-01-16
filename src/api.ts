import { CandleData, StockTicker, ApiResponse } from './types'

    const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
    const BASE_URL = 'https://www.alphavantage.co/query'

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    }

    export const fetchCandles = async (
      symbol: string,
      interval: string = '1min'
    ): Promise<ApiResponse<CandleData[]>> => {
      try {
        const response = await fetch(
          `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        const timeSeries = data[`Time Series (${interval})`]
        if (!timeSeries) {
          throw new Error('Invalid data format from API')
        }

        const uniqueData = new Map<string, CandleData>()

        Object.entries(timeSeries).forEach(([time, values]: [string, any]) => {
          const formattedTime = formatDate(time)
          uniqueData.set(formattedTime, {
            time: formattedTime,
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            close: parseFloat(values['4. close']),
            volume: parseFloat(values['5. volume'])
          })
        })

        const candles = Array.from(uniqueData.values())
          .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

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
          { symbol: 'XLF', name: 'Financial Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLK', name: 'Technology Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLE', name: 'Energy Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLV', name: 'Health Care Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLI', name: 'Industrial Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLY', name: 'Consumer Discretionary Select Sector SPDR Fund', exchange: 'NYSE ARCA' },
          { symbol: 'XLU', name: 'Utilities Select Sector SPDR Fund', exchange: 'NYSE ARCA' },

          // Top 20 Stocks
          { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
          { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
          { symbol: 'GOOGL', name: 'Alphabet Inc. (Class A)', exchange: 'NASDAQ' },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
          { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' },
          { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' },
          { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' },
          { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc. (Class B)', exchange: 'NYSE' },
          { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' },
          { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE' },
          { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE' },
          { symbol: 'XOM', name: 'Exxon Mobil Corporation', exchange: 'NYSE' },
          { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' },
          { symbol: 'PG', name: 'Procter & Gamble Company', exchange: 'NYSE' },
          { symbol: 'MA', name: 'Mastercard Incorporated', exchange: 'NYSE' },
          { symbol: 'HD', name: 'Home Depot Inc.', exchange: 'NYSE' },
          { symbol: 'UNH', name: 'UnitedHealth Group Incorporated', exchange: 'NYSE' },
          { symbol: 'CVX', name: 'Chevron Corporation', exchange: 'NYSE' },
          { symbol: 'PFE', name: 'Pfizer Inc.', exchange: 'NYSE' },
          { symbol: 'DIS', name: 'The Walt Disney Company', exchange: 'NYSE' }
        ]

        return { data: popularTickers }
      } catch (error) {
        return { data: [], error: error instanceof Error ? error.message : 'Unknown error' }
      }
    }
