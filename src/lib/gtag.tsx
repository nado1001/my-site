import { useRouter } from 'next/router'
// import Script from 'next/script'
import { useEffect } from 'react'

export const GA4_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID
export const UA_TRACKING_ID = process.env.NEXT_PUBLIC_UA_ID

export const pageview = (url: string) => {
  if (UA_TRACKING_ID) {
    window.gtag('config', UA_TRACKING_ID, {
      page_path: url
    })
  }
}

export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export const GoogleAnalytics = () => (
  <>
    {/* Global site tag (gtag.js) - Google Analytics */}
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
    />
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${UA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          gtag('config', '${UA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `
      }}
    />
  </>
)
