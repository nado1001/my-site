import { cache } from 'react'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
import { GetPostQuery } from '@/apollo/graphql'
import { GET_POST } from '@/apollo/queries'
import { Seo } from '@/component/Seo'

const getPost = cache(async (slug: string): Promise<{ data: GetPostQuery }> => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostQuery>({
    query: GET_POST,
    variables: {
      slug,
      stage: process.env.stage
    }
  })

  return addApolloState(apolloClient, {
    data
  })
})

export default async function Head({ params }: { params: { slug: string } }) {
  const { data } = await getPost(params.slug)

  return (
    <Seo
      path={data.post?.slug ?? ''}
      title={data.post?.title ?? ''}
      description={data.post?.description ?? ''}
      ogImage={`https://res.cloudinary.com/nado2022112/image/upload/l_text:Sawarabi%20Gothic_80_bold:${encodeURI(
        data.post?.title ?? ''
      )},co_rgb:333,w_1000,c_fit/v1641924252/article-ogp_keuplf.png`}
    />
  )
}
