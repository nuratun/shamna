"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { FALLBACK_SYP_PER_USD } from "@/lib/constants"

type DisplayCurrency = "SYP" | "USD"

interface CurrencyContextValue {
  displayCurrency: DisplayCurrency
  toggle: () => void
  /** Convert an amount from its original currency to the user's display currency */
  convert: (amount: number, fromCurrency: string) => number
  /** True while the exchange rate is still being fetched */
  rateLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)



export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [displayCurrency, setDisplayCurrency] = useState<DisplayCurrency>("SYP")
  const [sypPerUsd, setSypPerUsd] = useState<number>(FALLBACK_SYP_PER_USD)
  const [rateLoading, setRateLoading] = useState(true)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY
    if (!apiKey) {
      console.warn("[CurrencyContext] NEXT_PUBLIC_EXCHANGE_RATE_API_KEY not set — using fallback rate")
      setRateLoading(false)
      return
    }

    // ExchangeRate-API: GET https://v6.exchangerate-api.com/v6/{key}/pair/USD/SYP
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/SYP`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result === "success" && typeof data.conversion_rate === "number") {
          setSypPerUsd(data.conversion_rate)
        } else {
          console.warn("[CurrencyContext] Unexpected API response — using fallback rate", data)
        }
      })
      .catch((err) => {
        console.warn("[CurrencyContext] Rate fetch failed — using fallback rate", err)
      })
      .finally(() => setRateLoading(false))
  }, [])

  const toggle = useCallback(() => {
    setDisplayCurrency((c) => (c === "SYP" ? "USD" : "SYP"))
  }, [])

  const convert = useCallback(
    (amount: number, fromCurrency: string): number => {
      const from = fromCurrency.toUpperCase()

      if (from === displayCurrency) return amount

      // SYP → USD
      if (from === "SYP" && displayCurrency === "USD") {
        return amount / sypPerUsd
      }

      // USD → SYP
      if (from === "USD" && displayCurrency === "SYP") {
        return amount * sypPerUsd
      }

      // Unknown currency — return as-is
      return amount
    },
    [displayCurrency, sypPerUsd]
  )

  return (
    <CurrencyContext.Provider value={{ displayCurrency, toggle, convert, rateLoading }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>")
  return ctx
}