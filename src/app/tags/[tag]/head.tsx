import { cache } from 'react'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
import { GetPostsByTagNameQuery } from '@/apollo/graphql'
import { GET_POSTS_BY_TAG_NAME } from '@/apollo/queries'
import { Seo } from '@/component/Seo'

type Props = {
  data: GetPostsByTagNameQuery
}

const getTags = cache(async (tag: string): Promise<Props> => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsByTagNameQuery>({
    query: GET_POSTS_BY_TAG_NAME,
    variables: {
      tag: tag,
      stage: process.env.stage
    }
  })

  return addApolloState(apolloClient, {
    data
  })
})

export default async function Head({ params }: { params: { tag: string } }) {
  const { data } = await getTags(params.tag)

  return (
    <Seo
      path={`/tags/${data.tags[0].tagSlug}`}
      noTitleTemplate={true}
      title={`${data.tags[0].tagName}の記事一覧 | nado`}
      description="ナドの個人ブログ"
    />
  )
}
