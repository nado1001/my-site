type Props = {
  path: string
  title: string
  description?: string
  ogImage?: string
  noindex?: boolean
  noTitleTemplate?: boolean
}

const isProd = process.env.NODE_ENV == 'production'
const url = isProd ? 'https://nado1999.me' : 'http://localhost:3000'

export const Seo = (props: Props) => {
  const {
    path,
    title,
    description = 'nadoの個人ブログ',
    ogImage,
    noindex = false,
    noTitleTemplate
  } = props

  const APP_ROOT_URL = url
  const pageUrl = APP_ROOT_URL + path
  const ogImageUrl = ogImage ? ogImage : APP_ROOT_URL + '/default-og.png'

  return (
    <>
      <link href="/image/nado.svg" rel="icon" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {noindex && <meta name="robots" content="noindex" />}
      <title>{noTitleTemplate ? title : `${title} | nado`}</title>
      <meta name="description" content={description} />

      {/* OGP */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="nado" />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nado_b1ue" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <link rel="canonical" href={pageUrl} />
    </>
  )
}
