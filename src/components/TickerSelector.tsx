import { StockTicker } from '../types'

    interface TickerSelectorProps {
      tickers: StockTicker[]
      selectedTicker: string
      onSelect: (symbol: string) => void
    }

    export const TickerSelector = ({
      tickers = [],
      selectedTicker,
      onSelect,
    }: TickerSelectorProps) => {
      return (
        <select
          value={selectedTicker}
          onChange={(e) => onSelect(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select a ticker</option>
          {tickers.map((ticker) => (
            <option key={ticker.symbol} value={ticker.symbol}>
              {ticker.name} ({ticker.symbol})
            </option>
          ))}
        </select>
      )
    }
