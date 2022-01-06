import cc from 'classcat'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { VFC } from 'react'

import { addApolloState, initializeApollo } from '../../apollo/apolloClient'
import type { GetPostsByTagNameQuery, GetTagsQuery } from '../../apollo/graphql'
import { GET_POSTS_BY_TAG_NAME, GET_TAGS } from '../../apollo/queries'
import { Article } from '../../component/Article'
import { Seo } from '../../component/Seo'
import { Layout } from '../../layout'

type Props = {
  data: GetPostsByTagNameQuery
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetTagsQuery>({
    query: GET_TAGS
  })
  const paths = data.tags.map((tag) => {
    return { params: { tags: tag.tagSlug! } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsByTagNameQuery>({
    query: GET_POSTS_BY_TAG_NAME,
    variables: { tag: params?.tags }
  })

  return addApolloState(apolloClient, {
    props: { data },
    revalidate: 60 * 60
  })
}

const Tags: VFC<Props> = (props) => {
  return (
    <>
      <Seo
        path={`/tags/${props.data.tags[0].tagSlug}`}
        noTitleTemplate={true}
        title={`${props.data.tags[0].tagName}の記事一覧 | nado`}
        description="ナドの個人ブログ"
      />
      <Layout>
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">
          {props.data.tags[0].tagName}
        </h1>
        <div className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}>
          {props.data.posts.map((post) => {
            return <Article key={post.id} {...post} />
          })}
        </div>
      </Layout>
    </>
  )
}

export default Tags
