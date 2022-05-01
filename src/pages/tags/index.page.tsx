import type { GetStaticProps } from 'next'
import Link from 'next/link'
import type { FC } from 'react'

import { addApolloState, initializeApollo } from '../../apollo/apolloClient'
import type { GetTagsQuery } from '../../apollo/graphql'
import { GET_TAGS } from '../../apollo/queries'
import { Seo } from '../../component/Seo'
import { Layout } from '../../layout'

type Props = {
  data: GetTagsQuery
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetTagsQuery>({
    query: GET_TAGS,
    variables: {
      stage: process.env.stage
    }
  })

  return addApolloState(apolloClient, {
    props: { data },
    revalidate: 60 * 60
  })
}

const Tags: FC<Props> = (props) => {
  return (
    <Layout>
      <Seo path="/tags" title="タグ一覧" description="タグ一覧" />
      <div className="relative h-full">
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Tags</h1>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5">
          {props.data?.tags.map((tag, index) => {
            return (
              <li
                key={index}
                className="font-bold border border-border01 dark:border-darkBorder01 rounded-lg dark:bg-[#1d2022] dark:hover:bg-darkBg03 bg-white hover:shadow-lg "
              >
                <Link href={`/tags/${tag.tagSlug}`}>
                  <a className="w-full min-h-[65px] flex items-center justify-center flex-col text-sm text-center">
                    {tag.tagName}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Tags
