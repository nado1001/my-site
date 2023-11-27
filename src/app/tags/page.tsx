import Link from 'next/link'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
import type { GetTagsQuery } from '@/apollo/graphql'
import { GET_TAGS } from '@/apollo/queries'
import { Seo } from '@/component/Seo'

type Props = {
  data: GetTagsQuery
}

const getTags = async (): Promise<Props> => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetTagsQuery>({
    query: GET_TAGS,
    variables: {
      stage: process.env.stage
    }
  })

  return addApolloState(apolloClient, {
    data
  })
}

export default async function Tags() {
  const { data } = await getTags()

  return (
    <>
      <Seo path="/tags" title="タグ一覧" description="タグ一覧" />
      <div className="relative h-full">
        <h1 className="font-bold text-4xl py-8 md:pb-7 md:pt-0">Tags</h1>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5">
          {data?.tags.map((tag, index) => {
            return (
              <li
                key={index}
                className="font-bold border border-borderGray dark:border-borderGrayDark rounded-lg dark:bg-cardDark dark:hover:bg-[#303133] bg-white hover:shadow-lg"
              >
                <Link
                  href={`/tags/${tag.tagSlug}`}
                  className="w-full min-h-[65px] flex items-center justify-center flex-col text-sm text-center"
                >
                  {tag.tagName}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
