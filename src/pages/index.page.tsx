// import { useQuery } from '@apollo/client'
import cc from 'classcat'
import type { GetStaticProps } from 'next'
import type { FC } from 'react'

import { addApolloState, initializeApollo } from '../apollo/apolloClient'
import type { GetPostsQuery } from '../apollo/graphql'
import { GET_POSTS } from '../apollo/queries'
import { Article } from '../component/Article'
import { Seo } from '../component/Seo'
import { Layout } from '../layout'
import { generatedRssFeed } from '../lib/feed'

type Props = {
  data: GetPostsQuery
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: {
      stage: process.env.stage
    }
  })

  await generatedRssFeed(data)

  return addApolloState(apolloClient, {
    props: { data },
    revalidate: 60 * 60
  })
}

const Home: FC<Props> = (props) => {
  return (
    <>
      <Seo
        path=""
        noTitleTemplate={true}
        title="nado"
        description="ナドの個人ブログ"
      />
      <Layout>
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Articles</h1>
        <div className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}>
          {props.data.posts.map((post) => {
            return <Article key={post.id} {...post} />
          })}
        </div>
      </Layout>
    </>
  )
}

export default Home
