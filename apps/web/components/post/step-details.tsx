const CITIES = [
  "دمشق", 
  "حلب", 
  "حمص", 
  "حماة", 
  "اللاذقية", 
  "طرطوس", 
  "إدلب", 
  "دير الزور"
]

export type ListingDetails = {
  title: string
  price: string
  condition: string
  city: string
  description: string
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs mb-1.5 font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--color-border)",
  fontSize: 13,
  color: "var(--color-text-primary)",
  background: "#fff",
  fontFamily: "var(--font-arabic)",
  outline: "none",
} as React.CSSProperties

export default function StepDetails({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: ListingDetails
  onChange: (v: ListingDetails) => void
  onNext: () => void
  onBack: () => void
}) {
  const set = (key: keyof ListingDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...value, [key]: e.target.value })

  const isValid = value.title && value.price && value.condition && value.city && value.description

  return (
    <div style={{ fontFamily: "var(--font-arabic)" }}>
      <h2
        className="text-base font-semibold mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        تفاصيل الإعلان
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--color-text-muted)" }}>
        أدخل معلومات واضحة لتجذب المشترين
      </p>

      <Field label="عنوان الإعلان *">
        <input
          style={inputStyle}
          value={value.title}
          onChange={set("title")}
          placeholder="مثال: آيفون ١٥ برو ماكس ٢٥٦ جيجا"
          maxLength={100}
        />
      </Field>

      <Field label="السعر (د.أ) *">
        <input
          style={{ ...inputStyle, direction: "ltr", textAlign: "right" }}
          type="number"
          value={value.price}
          onChange={set("price")}
          placeholder="0"
          min={0}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="الحالة *">
          <select style={inputStyle} value={value.condition} onChange={set("condition")}>
            <option value="">اختر...</option>
            <option value="new">جديد</option>
            <option value="used">مستعمل</option>
          </select>
        </Field>

        <Field label="المدينة *">
          <select style={inputStyle} value={value.city} onChange={set("city")}>
            <option value="">اختر...</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="الوصف *">
        <textarea
          style={{ ...inputStyle, height: 120, resize: "none" } as React.CSSProperties}
          value={value.description}
          onChange={set("description")}
          placeholder="اكتب وصفاً تفصيلياً: الحالة، المواصفات، سبب البيع..."
          maxLength={2000}
        />
        <p
          className="text-xs mt-1 text-left"
          style={{ color: "var(--color-text-muted)" }}
        >
          {value.description.length}/2000
        </p>
      </Field>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl text-sm transition-colors"
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
          onClick={onNext}
          disabled={!isValid}
          className="flex-[2] py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: "var(--color-brand)" }}
        >
          التالي: الصور ←
        </button>
      </div>
    </div>
  )
}