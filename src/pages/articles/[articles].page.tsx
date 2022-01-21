import 'highlight.js/styles/github-dark.css'

import { MenuAlt2Icon } from '@heroicons/react/solid'
import cc from 'classcat'
import { format } from 'date-fns'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import type { ReactElement, VFC } from 'react'
import { createElement } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'

import { addApolloState, initializeApollo } from '../../apollo/apolloClient'
import type { GetPostQuery, GetPostsQuery } from '../../apollo/graphql'
import { GET_POST, GET_POSTS } from '../../apollo/queries'
import { Author } from '../../component/Author'
import { CustomLink } from '../../component/CustomLink'
import { MarkdownToHtml } from '../../component/MarkdownToHtml'
import { Seo } from '../../component/Seo'
import { TableOfContent } from '../../component/TableOfContent'
import { ArticleLayout } from '../../layout'
import { useTableOfContentState } from '../../states/store'

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

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement: createElement,
    components: {
      a: CustomLink as any
    }
  })

const Articles: VFC<Props> = (props) => {
  const post = props.data.post
  const { open, setOpen } = useTableOfContentState()

  const handleClickTableOfContent = () => {
    setOpen()
  }

  return (
    <>
      <Seo
        path={`/${post?.slug!}`}
        title={post?.title}
        description={post?.description!}
        ogImage={`https://res.cloudinary.com/nado2022112/image/upload/l_text:Sawarabi%20Gothic_80_bold:${encodeURI(
          post?.title!
        )},co_rgb:333,w_1000,c_fit/v1641924252/article-ogp_keuplf.png`}
      />
      <ArticleLayout>
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-24 md:flex md:justify-between">
          <div className="md:hidden sticky top-0 z-50">
            <>
              <div className="w-full h-12 flex justify-start bg-white dark:bg-darkBg02 px-5 border-b border-border01 dark:border-darkBorder01">
                <button
                  className="flex items-center"
                  onClick={handleClickTableOfContent}
                >
                  <div className="w-5 mr-2">
                    <MenuAlt2Icon />
                  </div>
                  <div>目次</div>
                </button>
              </div>
              {open && (
                <>
                  <button
                    className="h-screen w-full fixed top-0 dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.2)]"
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
                          'dark:bg-[#464646] dark:hover:bg-darkHoverBg01 hover:opacity-70 bg-[#ededed] dark:border-darkBorder01 border rounded-[2.5rem] text-sm px-6 py-[4px]',
                          { 'ml-3': index !== 0 }
                        ])}
                      >
                        {tag.tagName}
                      </a>
                    </Link>
                  )
                })}
              </div>
              <div className="post">
                {
                  processor.processSync(props.highlightedBody)
                    .result as ReactElement
                }
              </div>
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
