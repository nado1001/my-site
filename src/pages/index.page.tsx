// import { useQuery } from '@apollo/client'
import cc from 'classcat'
import type { GetStaticProps } from 'next'
import type { VFC } from 'react'

import { addApolloState, initializeApollo } from '../apollo/apolloClient'
import type { GetPostsQuery } from '../apollo/graphql'
import { GET_POSTS } from '../apollo/queries'
import { Article } from '../component/Article'
import { Author } from '../component/Author'
import { Seo } from '../component/Seo'
import { Layout } from '../layout'

type Props = {
  data: GetPostsQuery
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: {}
  })
  return addApolloState(apolloClient, {
    props: { data },
    revalidate: 60 * 60
  })
}

const Home: VFC<Props> = (props) => {
  return (
    <>
      <Seo path="/" title="Home" description="Homeです" />
      <Layout>
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-28 md:flex">
          <div className="md:max-w-[724px] md:w-full md:col-start-1 md:col-end-2 sm:mx-4 sm:mb-32">
            <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Articles</h1>
            <div
              className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}
            >
              {props.data.posts.map((post) => {
                return (
                  <Article
                    key={post.id}
                    {...post}
                    // TODO: 1記事以上になったら削除
                    length={props.data.posts.length}
                  />
                )
              })}
            </div>
          </div>
          <div className="md:max-w-[250px] md:col-start-2 md:col-end-3 md:pt-[68px] md:ml-[50px]">
            <Author />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
