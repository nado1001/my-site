import NextHeadSeo from 'next-head-seo'
import type { VFC } from 'react'

export type SeoProps = {
  path: string
  title?: string
  description?: string
  ogImage?: string
  noindex?: boolean
  noTitleTemplate?: boolean
}

const isProd = process.env.NODE_ENV == 'production'
const url = isProd ? 'https://nado1999.me' : 'http://localhost:3000'

export const Seo: VFC<SeoProps> = (props) => {
  const {
    path,
    title,
    description = 'nadoの個人ブログ',
    ogImage,
    noindex,
    noTitleTemplate
  } = props

  const APP_ROOT_URL = url
  // Absolute page url
  const pageUrl = APP_ROOT_URL + path
  // Absolute og image url
  const ogImageUrl = ogImage ? ogImage : APP_ROOT_URL + '/default-og.png'

  return (
    <NextHeadSeo
      title={noTitleTemplate ? title : `${title} | nado`}
      canonical={pageUrl}
      description={description}
      robots={noindex ? 'noindex, nofollow' : undefined}
      og={{
        title,
        description,
        url: pageUrl,
        image: ogImageUrl,
        type: 'article',
        siteName: 'nado'
      }}
      twitter={{
        card: 'summary_large_image'
      }}
    />
  )
}
