import NextHeadSeo from 'next-head-seo'
import type { VFC } from 'react'

export type SeoProps = {
  path: string
  title?: string
  description?: string
  ogImagePath?: string
  noindex?: boolean
  noTitleTemplate?: boolean
}

const isProd = process.env.NODE_ENV == 'production'
const url = isProd ? 'https://nado.dev/' : ''

export const Seo: VFC<SeoProps> = (props) => {
  const {
    path,
    title,
    description = 'Default description',
    ogImagePath = '/default-og.png',
    noindex,
    noTitleTemplate
  } = props

  const APP_ROOT_URL = url
  // Absolute page url
  const pageUrl = APP_ROOT_URL + path
  // Absolute og image url
  const ogImageUrl = APP_ROOT_URL + ogImagePath

  return (
    <NextHeadSeo
      title={noTitleTemplate ? title : `${title} - nado.dev`}
      canonical={pageUrl}
      description={description}
      robots={noindex ? 'noindex, nofollow' : undefined}
      og={{
        title,
        description,
        url: pageUrl,
        image: ogImageUrl,
        type: 'article',
        siteName: 'nado.dev'
      }}
      twitter={{
        card: 'summary_large_image'
      }}
    />
  )
}
