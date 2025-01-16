export interface CandleData {
      time: string
      open: number
      high: number
      low: number
      close: number
      volume?: number
    }

    export interface StockTicker {
      symbol: string
      name: string
      exchange: string
    }

    export interface ApiResponse<T> {
      data: T
      error?: string
    }
