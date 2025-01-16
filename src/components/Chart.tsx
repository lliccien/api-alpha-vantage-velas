import { useEffect, useRef } from 'react'
    import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts'
    import { CandleData } from '../types'

    interface ChartProps {
      data: CandleData[]
      height?: number
    }

    export const Chart = ({ data, height = 400 }: ChartProps) => {
      const chartContainerRef = useRef<HTMLDivElement>(null)
      const chartRef = useRef<IChartApi | null>(null)
      const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

      useEffect(() => {
        if (chartContainerRef.current) {
          chartRef.current = createChart(chartContainerRef.current, {
            height,
            layout: {
              background: { color: '#ffffff' },
              textColor: '#333',
            },
            grid: {
              vertLines: { color: '#eee' },
              horzLines: { color: '#eee' },
            },
          })

          seriesRef.current = chartRef.current.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          })
        }

        return () => {
          chartRef.current?.remove()
        }
      }, [height])

      useEffect(() => {
        if (seriesRef.current) {
          seriesRef.current.setData(data)
        }
      }, [data])

      return <div ref={chartContainerRef} className="w-full" />
    }
