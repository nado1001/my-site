import 'highlight.js/styles/github-dark.css'

import { ChevronRightIcon } from '@heroicons/react/outline'
import cc from 'classcat'
import { format } from 'date-fns'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import type { VFC } from 'react'
import { useState } from 'react'

import { addApolloState, initializeApollo } from '../../apollo/apolloClient'
import type { GetPostQuery, GetPostsQuery } from '../../apollo/graphql'
import { GET_POST, GET_POSTS } from '../../apollo/queries'
import { Author } from '../../component/Author'
import { MarkdownToHtml } from '../../component/MarkdownToHtml'
import { Seo } from '../../component/Seo'
import { TableOfContent } from '../../component/TableOfContent'
import { ArticleLayout } from '../../layout'

type Props = {
  data: GetPostQuery
  highlightedBody: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostsQuery>({
    query: GET_POSTS
  })
  const paths = data.posts.map((post) => {
    return { params: { articles: post.slug } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetPostQuery>({
    query: GET_POST,
    variables: { slug: params?.articles }
  })

  const highlightedBody = await MarkdownToHtml(data.post?.content!)

  return addApolloState(apolloClient, {
    props: { data, highlightedBody },
    revalidate: 60 * 60
  })
}

const Articles: VFC<Props> = (props) => {
  const post = props.data.post
  const [open, setOpen] = useState<boolean>(false)

  const handleClickTableOfContent = () => {
    setOpen(!open)
  }

  return (
    <>
      <Seo
        path={`/${post?.slug!}`}
        title={post?.title}
        description={post?.description!}
      />
      <ArticleLayout>
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-24 md:flex md:justify-between">
          <div className="md:hidden sticky top-0">
            <>
              <button
                className="w-full flex justify-start bg-white dark:bg-darkBg02 py-3 px-5 border-b border-border01 dark:border-darkBorder01"
                onClick={handleClickTableOfContent}
              >
                <div className="flex items-center w-full">
                  <div>目次</div>
                  <div className="w-5 ml-1">
                    <ChevronRightIcon
                      className={cc([
                        'transform transition-all',
                        { 'rotate-90': open }
                      ])}
                    />
                  </div>
                </div>
              </button>
              {open && (
                <>
                  <button
                    className="h-screen w-full absolute"
                    onClick={handleClickTableOfContent}
                  />
                  <TableOfContent
                    tableofcontent={post?.tableofcontent}
                    className=""
                  />
                </>
              )}
            </>
          </div>
          <div className="md:dark:bg-darkBg02 md:bg-white dark:border-darkBorder01 md:border md:p-10 md:rounded-lg md:w-[calc(100%-300px)]">
            <div className="flex sm:flex-col sm:items-center md:items-end md:justify-between sm:p-12 md:pb-6">
              <h1 className="text-3xl font-semibold">{post?.title}</h1>
              <span className="text-xs block sm:mt-5">
                {format(new Date(post?.date), 'yyyy.MM.dd')}
              </span>
            </div>
            <section className="sm:dark:bg-darkBg02 sm:bg-white dark:border-darkBorder01 sm:border-t sm:border-b sm:px-4 sm:pt-[30px] sm:pb-[50px] sm:mb-32">
              <div
                className="flex items-start overflow-x-scroll"
                style={{ wordBreak: 'keep-all' }}
              >
                {post?.tag.map((tag, index) => {
                  return (
                    <Link href={`/tags/${tag.tagSlug}`} key={index}>
                      <a
                        className={cc([
                          'dark:bg-[#464646] dark:hover:bg-darkHoverBg01 bg-[#ededed] dark:border-darkBorder01 border rounded-[2.5rem] text-sm px-6 py-[4px]',
                          { 'ml-3': index !== 0 }
                        ])}
                      >
                        {tag.tagName}
                      </a>
                    </Link>
                  )
                })}
              </div>
              <div
                className="post"
                dangerouslySetInnerHTML={{
                  __html: props.highlightedBody
                }}
              />
            </section>
          </div>
          <aside className="md:max-w-[250px]">
            <div className="h-full flex flex-col">
              <Author />
              <div className="h-8 sm:hidden" />
              <TableOfContent
                tableofcontent={post?.tableofcontent}
                className="sm:hidden"
              />
            </div>
          </aside>
        </div>
      </ArticleLayout>
    </>
  )
}

export default Articles
