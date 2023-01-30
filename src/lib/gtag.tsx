'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

export const GA4_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID || ''

export const pageView = (url: string) => {
  if (!GA4_TRACKING_ID || typeof window === 'undefined') return

  window.gtag('config', GA4_TRACKING_ID, {
    page_path: url
  })
}

export const usePageView = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    pageView(url)
  }, [pathname, searchParams])
}

const PageView = () => {
  usePageView()
  return <></>
}

export const GoogleAnalytics = () => (
  <>
    <Script
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
      strategy="afterInteractive"
    />
    <Script
      defer
      id="ga"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());    
          gtag('config', '${GA4_TRACKING_ID}');
        `
      }}
      strategy="afterInteractive"
    />
    <PageView />
  </>
)
