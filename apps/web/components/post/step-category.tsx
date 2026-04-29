const CATEGORIES = [
  { slug: "real-estate", label: "عقارات", icon: "🏠" },
  { slug: "cars", label: "سيارات", icon: "🚗" },
  { slug: "electronics", label: "إلكترونيات", icon: "📱" },
  { slug: "furniture", label: "أثاث ومنزل", icon: "🛋️" },
  { slug: "clothing", label: "ملابس", icon: "👗" },
  { slug: "jobs", label: "وظائف وخدمات", icon: "💼" }
]

export default function StepCategory({
  value,
  onChange,
  onNext
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  return (
    <div style={{ fontFamily: "var(--font-arabic)" }}>
      <h2
        className="text-base font-semibold mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        اختر فئة الإعلان
      </h2>
      <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
        اختر الفئة الأنسب لما تريد بيعه
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
            style={{
              background: value === cat.slug ? "#F5EDE6" : "#fff",
              border: value === cat.slug
                ? "1.5px solid #C2622A"
                : "1px solid var(--color-border)",
              fontFamily: "var(--font-arabic)",
            }}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span
              className="text-xs font-medium text-center"
              style={{
                color: value === cat.slug ? "#8C4420" : "var(--color-text-primary)",
              }}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ background: "var(--color-brand)" }}
      >
        التالي: التفاصيل ←
      </button>
    </div>
  )
}