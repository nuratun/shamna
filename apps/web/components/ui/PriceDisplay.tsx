"use client"

import { useCurrency } from "@/contexts/currency-context"
import { formatPrice } from "@/lib/format-price"

interface PriceDisplayProps {
  amount: number
  currency: string
  className?: string
}

/**
 * A thin client component that reads from CurrencyContext and renders a
 * converted, formatted price. Use this anywhere you have a server component
 * that can't call useCurrency() directly.
 */
export default function PriceDisplay({ amount, currency, className }: PriceDisplayProps) {
  const { convert, displayCurrency } = useCurrency()

  return (
    <p
      className={className}
      style={{ color: "var(--color-brand)" }}
    >
      {formatPrice(amount, currency, convert, displayCurrency)}
    </p>
  )
}