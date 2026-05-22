// SYP per 1 USD — used as the fallback if the API call fails.
// Update this periodically; the live fetch will override it during the session.
export const FALLBACK_SYP_PER_USD = 14000

export const STEPS = [
  "الفئة",
  "التفاصيل",
  "الصور",
  "المراجعة"
]

export const CITIES = [
  "دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "طرطوس",
  "إدلب",
  "دير الزور"
]

export const CATEGORIES = [
  { slug: "real-estate", label: "عقارات", icon: "🏠" },
  { slug: "cars", label: "سيارات", icon: "🚗" },
  { slug: "electronics", label: "إلكترونيات", icon: "📱" },
  { slug: "furniture", label: "أثاث ومنزل", icon: "🛋️" },
  { slug: "clothing", label: "ملابس", icon: "👗" },
  { slug: "jobs", label: "وظائف وخدمات", icon: "💼" }
]