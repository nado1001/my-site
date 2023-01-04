import cc from 'classcat'
import { cache } from 'react'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
import type { GetPostsByTagNameQuery, GetTagsQuery } from '@/apollo/graphql'
import { GET_POSTS_BY_TAG_NAME, GET_TAGS } from '@/apollo/queries'
import { Article } from '@/component/Article'

type Props = {
  data: GetPostsByTagNameQuery
}

export const dynamicParams = false

export async function generateStaticParams() {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetTagsQuery>({
    query: GET_TAGS,
    variables: {
      stage: process.env.stage
    }
  })

  return data.tags.map((tag) => {
    return { tag: tag.tagSlug }
  })
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

export default async function Tags({ params }: { params: { tag: string } }) {
  const { data } = await getTags(params.tag)

  return (
    <>
      <h1 className="font-bold text-4xl sm:py-8 md:pb-7">
        {data.tags[0].tagName}
      </h1>
      <div className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}>
        {data.posts.map((post) => {
          return <Article key={post.id} {...post} />
        })}
      </div>
    </>
  )
}
