import 'highlight.js/styles/github-dark.css'
import '@/styles/globals.css'

import cc from 'classcat'
import { format } from 'date-fns'
import Link from 'next/link'
import { cache } from 'react'
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

export const dynamicParams = false
export const revalidate = 3600

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

const getPost = cache(async (slug: string): Promise<Props> => {
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
})

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

        <div className="md:dark:bg-darkBg02 md:bg-white dark:border-darkBorder01 md:border md:p-10 md:rounded-lg md:w-[calc(100%-300px)]">
          <div className="flex sm:flex-col sm:items-center md:items-end md:justify-between sm:py-12 sm:px-6 md:pb-6">
            <h1 className="text-3xl font-semibold">{data.post.title}</h1>
            <span className="text-xs block sm:mt-5">
              {format(new Date(data.post.date), 'yyyy.MM.dd')}
            </span>
          </div>
          <section className="sm:dark:bg-darkBg02 sm:bg-white dark:border-darkBorder01 sm:border-t sm:border-b sm:px-4 sm:pt-[30px] sm:pb-[50px] sm:mb-32">
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
                      'dark:bg-[#464646] dark:hover:bg-darkHoverBg01 hover:opacity-70 bg-[#ededed] dark:border-darkBorder01 border rounded-[2.5rem] text-sm px-6 py-[4px]',
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
            <div className="h-8 sm:hidden" />
            <TableOfContent
              tableofcontent={data.post.tableofcontent}
              className="sm:hidden"
              isPc={true}
            />
          </div>
        </aside>
      </div>
    </>
  )
}
