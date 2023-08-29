import cc from 'classcat'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
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

  return addApolloState(apolloClient, {
    data
  })
}

const Home = async () => {
  const {
    data: { posts }
  } = await getPosts()

  try {
    await generatedRssFeed({ posts })
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <Seo
        path=""
        noTitleTemplate={true}
        title="nado"
        description="ナドの個人ブログ"
      />
      <DefaultLayout>
        <h1 className="font-bold text-4xl py-8 md:pb-7 md:pt-0">Articles</h1>
        <div
          className={cc([
            'grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:gap-[30px] gap-4'
          ])}
        >
          {posts.map((post) => {
            return <Article key={post.id} {...post} />
          })}
        </div>
      </DefaultLayout>
    </>
  )
}

export default Home
