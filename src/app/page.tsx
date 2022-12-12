import cc from 'classcat'

import { initializeApollo } from '@/apollo/apolloClient'
import type { GetPostsQuery } from '@/apollo/graphql'
import { GET_POSTS } from '@/apollo/queries'
import { Article } from '@/component/Article'
import { Seo } from '@/component/Seo'
import { generatedRssFeed } from '@/lib/feed'

import { DefaultLayout } from './DefaultLayout'

type Props = {
  data: GetPostsQuery
}

const getPosts = async (): Promise<Props> => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: {
      stage: process.env.stage
    }
  })

  await generatedRssFeed(data)

  return { data: data }
}

export default async function Page() {
  const {
    data: { posts }
  } = await getPosts()

  return (
    <>
      <Seo
        path=""
        noTitleTemplate={true}
        title="nado"
        description="ナドの個人ブログ"
      />
      <DefaultLayout>
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Articles</h1>
        <div className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}>
          {posts.map((post) => {
            return <Article key={post.id} {...post} />
          })}
        </div>
      </DefaultLayout>
    </>
  )
}
