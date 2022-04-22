import { useQuery } from '@apollo/client'
import Link from 'next/link'
import type { VFC } from 'react'

import { GetTagsQuery } from '../../apollo/graphql'
import { GET_TAGS } from '../../apollo/queries'
import { Loading } from '../../component/Loading'
import { Seo } from '../../component/Seo'
import { Layout } from '../../layout'

const Tags: VFC = () => {
  const { data, loading } = useQuery<GetTagsQuery>(GET_TAGS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      stage: process.env.stage
    }
  })

  return (
    <Layout>
      <Seo path="/tags" title="タグ一覧" description="タグ一覧" />
      <div className="relative h-full">
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Tags</h1>
        {loading ? (
          <div className="sm:pt-16">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
              <Loading />
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5">
            {data?.tags.map((tag, index) => {
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
        )}
      </div>
    </Layout>
  )
}

export default Tags
