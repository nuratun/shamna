"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import StepIndicator from "@/components/post/step-indicator"
import StepCategory from "@/components/post/step-category"
import StepDetails, { type ListingDetails } from "@/components/post/step-details"
import StepPhotos from "@/components/post/step-photos"
import StepReview from "@/components/post/step-review"
import { apiFetch } from "@/lib/api"

const EMPTY_DETAILS: ListingDetails = {
  title: "",
  price: "",
  condition: "",
  city: "",
  description: ""
}

export default function PostPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState("")
  const [details, setDetails] = useState<ListingDetails>(EMPTY_DETAILS)
  const [photos, setPhotos] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    try {
      const token = localStorage.getItem("access_token")
      const formData = new FormData()
      formData.append("category", category)
      formData.append("title", details.title)
      formData.append("price", details.price)
      formData.append("condition", details.condition)
      formData.append("city", details.city)
      formData.append("description", details.description)
      photos.forEach((photo) => formData.append("photos", photo))

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      router.push("/?posted=1")
    } catch {
      alert("حدث خطأ أثناء نشر الإعلان، يرجى المحاولة مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="max-w-xl mx-auto px-4 py-8"
      style={{ fontFamily: "var(--font-arabic)" }}
    >
      <h1
        className="text-lg font-semibold mb-6 text-center"
        style={{ color: "var(--color-text-primary)" }}
      >
        أضف إعلان جديد
      </h1>

      <StepIndicator current={step} />

      <div
        className="rounded-2xl p-6"
        style={{
          background: "#fff",
          border: "1px solid var(--color-border)",
        }}
      >
        {step === 0 && (
          <StepCategory
            value={category}
            onChange={setCategory}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepDetails
            value={details}
            onChange={setDetails}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <StepPhotos
            photos={photos}
            onChange={setPhotos}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepReview
            category={category}
            details={details}
            photos={photos}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}