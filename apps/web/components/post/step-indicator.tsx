const STEPS = [
  "الفئة", 
  "التفاصيل", 
  "الصور", 
  "المراجعة"
]

export default function StepIndicator({ steps, current }: { steps: string[], current: number }) {
  return (
    <div
      className="flex items-start mb-8"
      style={{ fontFamily: "var(--font-arabic)" }}
    >
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "idle"
        return (
          <div key={i} className="flex flex-col items-center flex-1 relative">
            {/* Connector line */}
            {i > 0 && (
              <div
                className="absolute top-3.5 right-1/2 w-full h-px -translate-y-1/2"
                style={{
                  background: i <= current ? "#C2622A" : "var(--color-border)",
                  zIndex: 0
                }}
              />
            )}
            {/* Circle */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium z-10"
              style={{
                background: state !== "idle" ? "#C2622A" : "#fff",
                color: state !== "idle" ? "#fff" : "var(--color-text-muted)",
                border: state === "idle" ? "1.5px solid var(--color-border)" : "none",
                boxShadow: state === "active" ? "0 0 0 4px #F5EDE6" : "none",
              }}
            >
              {state === "done" ? "✓" : i + 1}
            </div>
            {/* Label */}
            <span
              className="text-xs mt-1"
              style={{
                color: state === "active" ? "#C2622A" : "var(--color-text-muted)",
                fontWeight: state === "active" ? 500 : 400
              }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}