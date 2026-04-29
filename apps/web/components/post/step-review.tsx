"use client"

import { type ListingDetails } from "./step-details"

const CATEGORY_LABELS: Record<string, string> = {
  "real-estate": "عقارات",
  cars: "سيارات",
  electronics: "إلكترونيات",
  furniture: "أثاث ومنزل",
  clothing: "ملابس",
  jobs: "وظائف وخدمات"
}

const CONDITION_LABELS: Record<string, string> = {
  new: "جديد",
  used: "مستعمل"
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between items-start py-3"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </span>
      <span
        className="text-sm font-medium text-left max-w-xs"
        style={{ color: "var(--color-text-primary)" }}
      >
        {value}
      </span>
    </div>
  )
}

export default function StepReview({
  category,
  details,
  photos,
  onSubmit,
  onBack,
  loading,
}: {
  category: string
  details: ListingDetails
  photos: File[]
  onSubmit: () => void
  onBack: () => void
  loading: boolean
}) {
  const previews = photos.map((f) => URL.createObjectURL(f))

  return (
    <div style={{ fontFamily: "var(--font-arabic)" }}>
      <h2
        className="text-base font-semibold mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        مراجعة الإعلان
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--color-text-muted)" }}>
        تحقق من المعلومات قبل النشر
      </p>

      {/* Photo previews */}
      {previews.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {previews.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-20 h-20 rounded-lg overflow-hidden"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Details summary */}
      <div
        className="rounded-xl overflow-hidden mb-6"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <Row label="الفئة" value={CATEGORY_LABELS[category] ?? category} />
        <Row label="العنوان" value={details.title} />
        <Row label="السعر" value={`${Number(details.price).toLocaleString("en-US")} د.أ`} />
        <Row label="الحالة" value={CONDITION_LABELS[details.condition] ?? details.condition} />
        <Row label="المدينة" value={details.city} />
        <div className="py-3">
          <p className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>
            الوصف
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-primary)", lineHeight: 1.6 }}>
            {details.description}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3 rounded-xl text-sm transition-colors disabled:opacity-40"
          style={{
            border: "1px solid var(--color-border)",
            background: "#fff",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-arabic)",
          }}
        >
          → السابق
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-[2] py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--color-brand)" }}
        >
          {loading ? "جاري النشر..." : "نشر الإعلان ✓"}
        </button>
      </div>
    </div>
  )
}