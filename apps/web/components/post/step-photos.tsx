"use client"

import { useRef } from "react"
import { X, Plus } from "lucide-react"
import { PostFormData } from "@/types/post"

const MAX_PHOTOS = 5

export default function StepPhotos({
  images,
  onChange,
  onNext,
  onBack
}: {
  images: File[]
  onChange: (files: File[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const merged = [...images, ...files].slice(0, MAX_PHOTOS)
    onChange(merged)
    e.target.value = ""
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  const previews = images.map((f) => URL.createObjectURL(f))

  return (
    <div style={{ fontFamily: "var(--font-arabic)" }}>
      <h2
        className="text-base font-semibold mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        صور الإعلان
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--color-text-muted)" }}>
        أضف حتى {MAX_PHOTOS} صور — الصورة الأولى ستكون الغلاف
      </p>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {previews.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden"
            style={{ border: "1.5px solid #C2622A" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
            {i === 0 && (
              <span
                className="absolute bottom-0 right-0 left-0 text-center text-white py-0.5"
                style={{ background: "rgba(194,98,42,0.8)", fontSize: 9 }}
              >
                غلاف
              </span>
            )}
            <button
              onClick={() => remove(i)}
              className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <X size={10} color="#fff" />
            </button>
          </div>
        ))}

        {images.length < MAX_PHOTOS && (
          <button
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
            style={{
              border: "1.5px dashed var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-muted)",
            }}
          >
            <Plus size={18} />
            <span style={{ fontSize: 9 }}>إضافة</span>
          </button>
        )}

        {/* Empty slots */}
        {Array.from({
          length: Math.max(0, MAX_PHOTOS - images.length - 1),
        }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-lg"
            style={{
              border: "1px dashed var(--color-border)",
              background: "var(--color-surface)",
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <p className="text-xs mb-5 text-center" style={{ color: "var(--color-text-muted)" }}>
        {images.length}/{MAX_PHOTOS} صور مضافة
        {images.length === 0 && " · يمكنك المتابعة بدون صور"}
      </p>

      <div className="flex gap-2">
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
          className="flex-[2] py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--color-brand)" }}
        >
          التالي: المراجعة ←
        </button>
      </div>
    </div>
  )
}