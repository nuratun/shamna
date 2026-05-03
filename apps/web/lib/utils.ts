import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { type HeroCategory } from "@/components/hero"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const HERO_CATEGORIES: HeroCategory[] = [
  {
    slug: "cars",
    name: "سيارات",
    icon: "🚗",
    bannerImage: "/categories/category-car.jpg",
    bannerHeading: "سيارات بأفضل الأسعار",
    bannerSubtext: "آلاف الإعلانات من أصحابها مباشرة",
    accentColor: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
  },
  {
    slug: "real-estate",
    name: "عقارات",
    icon: "🏠",
    bannerImage: "/categories/category-real-estate.jpg",
    bannerHeading: "ابحث عن بيتك المثالي",
    bannerSubtext: "شقق وبيوت للبيع والإيجار في كل المدن",
    accentColor: "linear-gradient(135deg, #1a3a2e 0%, #0f4a30 100%)",
  },
  { 
    slug: "electronics", 
    name: "إلكترونيات", 
    icon: "📱", 
    bannerImage: "/categories/category-electronics.jpg",
    bannerHeading: "اعثر على هاتفك أو جهاز الكمبيوتر المثالي لك",
    bannerSubtext: "",
    accentColor: "linear-gradient(135deg, #1a3a2e 0%, #E6FAF0 100%)" 
  },
  { 
    slug: "furniture", 
    name: "أثاث ومنزل", 
    icon: "🛋️", 
    bannerImage: "/categories/category-furniture.jpg",
    bannerHeading: "اعثر على تصميم منزلك المثالي",
    bannerSubtext: "",
    accentColor: "linear-gradient(135deg, #1a3a2e 0%, #FFF8E6 100%)" 
  },
  { slug: "clothing", 
    name: "ملابس", 
    icon: "👗", 
    bannerImage: "/categories/category-clothing.jpg",
    bannerHeading: "اعثري على إطلالتكِ المثالية",
    bannerSubtext: "",
    accentColor: "linear - gradient(135deg, #1a3a2e 0 %, #F9E6FF 100%)"
  },
  { slug: "jobs", 
    name: "وظائف وخدمات", 
    icon: "💼", 
    bannerImage: "/categories/category-jobs.jpg",
    bannerHeading: "ابحث عن وظيفتك التالية",
    bannerSubtext: "",
    accentColor: "linear - gradient(135deg, #1a3a2e 0 %, #E6FFF6 100 %)"
  }
]
