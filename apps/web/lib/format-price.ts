/**
 * Converts `amount` (in `fromCurrency`) to `displayCurrency` using the
 * provided `convert` function from CurrencyContext, then formats it for display.
 *
 * Usage:
 *   const { convert, displayCurrency } = useCurrency()
 *   formatPrice(listing.price, listing.currency, convert, displayCurrency)
 *   // → "١٤٬٠٠٠٬٠٠٠ ل.س"  or  "1,000.00 $"
 */
export function formatPrice(
  amount: number,
  fromCurrency: string,
  convert: (amount: number, fromCurrency: string) => number,
  displayCurrency: string
): string {
  const converted = convert(amount, fromCurrency)

  if (displayCurrency === "USD") {
    return `$${converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  // SYP — no decimals, Arabic-style thousands separator
  return `${Math.round(converted).toLocaleString("en-US")} ل.س`
}