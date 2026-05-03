"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Search, 
  PlusCircle, 
  User, 
  Bell, 
  Heart, 
  ClipboardList 
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const { user, logout, isLoading } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!dropdownOpen) return
    const close = () => setDropdownOpen(false)
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [dropdownOpen])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    router.push("/")
  }

  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", background: "#fff" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4 justify-center place-items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold shrink-0"
          style={{ color: "var(--color-brand)", fontFamily: "var(--font-arabic)" }}
        >
          شامنا
        </Link>

        {/* Search bar */}
        <div className="flex-1 relative max-w-xl">
          <Search
            size={16}
            className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أي شيء..."
            className="w-full h-10 pr-9 pl-4 rounded-lg text-sm outline-none"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              fontFamily: "var(--font-arabic)"
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">

          {isLoading ? (
            <div style={{ width: 160, height: 36, borderRadius: 8, background: "var(--color-surface)" }} />

          ) : user ? (
            /* ── LOGGED IN: icon row ── */
            <>
              {/* Notifications */}
              <Link href="/notifications" style={iconBtnStyle} title="الإشعارات">
                <Bell size={18} />
              </Link>

              {/* Saved / Favourites */}
              <Link href="/saved" style={iconBtnStyle} title="المفضلة">
                <Heart size={18} />
              </Link>

              {/* My listings */}
              <Link href="/my-listings" style={iconBtnStyle} title="إعلاناتي">
                <ClipboardList size={18} />
              </Link>

              {/* Avatar + dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o) }}
                  style={{
                    ...iconBtnStyle,
                    background: "var(--color-brand)",
                    borderColor: "var(--color-brand)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 13,
                    overflow: "hidden"
                  }}
                  title="حسابي"
                >
                  {user.profile_pic
                    ? <img src={user.profile_pic} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : (user.name?.[0] ?? "؟")}
                </button>

                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    insetInlineEnd: 0,
                    minWidth: 160,
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    zIndex: 100,
                    overflow: "hidden"
                  }}>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)}
                      style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "var(--color-text-primary)", textDecoration: "none" }}>
                      الملف الشخصي
                    </Link>
                    <Link href="/my-listings" onClick={() => setDropdownOpen(false)}
                      style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "var(--color-text-primary)", textDecoration: "none" }}>
                      إعلاناتي
                    </Link>
                    <button onClick={handleLogout}
                      style={{ display: "block", width: "100%", textAlign: "inherit", padding: "10px 16px", fontSize: 14, color: "#e53e3e", background: "none", border: "none", cursor: "pointer", borderTop: "1px solid var(--color-border)" }}>
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </>

          ) : (
            /* ── LOGGED OUT: two buttons ── */
            <>
              <Link
                href={`/auth?from=/post`}
                className="flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-brand)", fontFamily: "var(--font-arabic)" }}
              >
                <PlusCircle size={16} />
                <span>أضف إعلان</span>
              </Link>

              <Link
                href={`/auth?from=${pathname}`}
                className="flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium transition-colors"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-arabic)",
                }}
              >
                <User size={16} />
                <span>دخول</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

/* Shared style for the icon circle buttons */
const iconBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--color-border)",
  background: "transparent",
  color: "var(--color-text-primary)",
  cursor: "pointer",
  textDecoration: "none",
  flexShrink: 0
}