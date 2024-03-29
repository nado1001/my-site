import 'highlight.js/styles/github-dark.css'
import '@/styles/globals.css'

import cc from 'classcat'
import { format } from 'date-fns'
import Link from 'next/link'
import { createElement, ReactElement } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'

import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
import type { GetPostQuery, GetPostsQuery } from '@/apollo/graphql'
import { GET_POST, GET_POSTS } from '@/apollo/queries'
import { Author } from '@/component/Author'
import { CustomLink } from '@/component/CustomLink'
import { MarkdownToHtml } from '@/component/MarkdownToHtml'
import { Seo } from '@/component/Seo'
import { TableOfContent } from '@/component/TableOfContent'

type Props = {
  data: GetPostQuery
  highlightedBody: string
}

// export const dynamicParams = false
// export const revalidate = 3600

export async function generateStaticParams() {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: {
      stage: process.env.stage
    }
  })

  return data.posts.map((post) => {
    return { slug: post.slug }
  })
}

const getPost = async (slug: string): Promise<Props> => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostQuery>({
    query: GET_POST,
    variables: {
      slug,
      stage: process.env.stage
    }
  })

  const highlightedBody = await MarkdownToHtml(data.post?.content!)

  return addApolloState(apolloClient, {
    data,
    highlightedBody
  })
}

const processor = unified()
  .use(rehypeParse as any, { fragment: true })
  .use(rehypeReact as any, {
    createElement: createElement,
    components: {
      a: CustomLink as any
    }
  })

export default async function Post({ params }: { params: { slug: string } }) {
  const { data, highlightedBody } = await getPost(params.slug)
  if (!data.post) return <div>loading...</div>

  return (
    <>
      <Seo
        path={`/${data.post.slug}`}
        title={data.post.title}
        description={data.post.description ?? ''}
        ogImage={`https://res.cloudinary.com/nado2022112/image/upload/l_text:Sawarabi%20Gothic_80_bold:${encodeURI(
          data.post?.title!
        )},co_rgb:333,w_1000,c_fit/v1641924252/article-ogp_keuplf.png`}
      />
      <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-24 md:flex md:justify-between">
        <div className="md:hidden sticky top-0 z-50">
          <>
            <TableOfContent
              tableofcontent={data.post?.tableofcontent}
              className=""
              isPc={false}
            />
          </>
        </div>

        <div className="md:dark:bg-cardDark md:bg-white-primary dark:border-borderGrayDark md:border md:p-10 md:rounded-lg md:w-[calc(100%-300px)]">
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between py-12 px-6 md:pb-6 md:px-0 md:pt-0">
            <h1 className="text-3xl font-semibold">{data.post.title}</h1>
            <span className="text-xs block mt-5">
              {format(new Date(data.post.date), 'yyyy.MM.dd')}
            </span>
          </div>
          <section className="dark:border-borderGrayDark md:border-none border-t border-b px-4 md:px-0 pt-[30px] md:pt-0 pb-[50px] md:pb-0 mb-32 md:mb-0">
            <div
              className="flex items-start overflow-x-scroll"
              style={{ wordBreak: 'keep-all' }}
            >
              {data.post.tag.map((tag, index) => {
                return (
                  <Link
                    href={`/tags/${tag.tagSlug}`}
                    key={index}
                    className={cc([
                      'dark:bg-tagDark dark:hover:bg-[#414142] hover:opacity-70 bg-tagLight dark:border-borderGrayDark border rounded-[2.5rem] text-sm px-6 py-[4px]',
                      { 'ml-3': index !== 0 }
                    ])}
                  >
                    {tag.tagName}
                  </Link>
                )
              })}
            </div>
            <div className="post">
              {processor.processSync(highlightedBody).result as ReactElement}
            </div>
          </section>
        </div>

        <aside className="md:max-w-[250px]">
          <div className="h-full flex flex-col">
            <Author />
            <div className="h-8 pc-only" />
            <TableOfContent
              tableofcontent={data.post.tableofcontent}
              className="pc-only"
              isPc={true}
            />
          </div>
        </aside>
      </div>
    </>
  )
}
