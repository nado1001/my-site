import cc from 'classcat'

// import { addApolloState, initializeApollo } from '@/apollo/apolloClient'
// import type { GetPostsQuery } from '@/apollo/graphql'
// import { GET_POSTS } from '@/apollo/queries'
import { Article } from '@/component/Article'
import { Seo } from '@/component/Seo'

// import { generatedRssFeed } from '@/lib/feed'
import { DefaultLayout } from './DefaultLayout'

// type Props = {
//   data: GetPostsQuery
// }

// const getPosts = async (): Promise<Props> => {
//   const apolloClient = initializeApollo()
//   const { data } = await apolloClient.query<GetPostsQuery>({
//     query: GET_POSTS,
//     variables: {
//       stage: process.env.stage
//     }
//   })

//   return addApolloState(apolloClient, {
//     data
//   })
// }

const posts = [
  {
    id: 'cl4eh84vx0kc20d168b8olwg9',
    title:
      'semantic-releaseとrenovateを併用しているプロジェクトで気をつけること',
    description:
      '先日、sd-tailwindcss-transformerというライブラリをリリースしました。このライブラリを作成するにあたってsemantic-releaseとrenovateを利用していたのですが、少し問題が起きてしまったので問題の内容と対処法をこの記事で残しておきたいと思います。',
    date: '2022-09-30',
    updatedAt: '2022-09-30T18:50:14.427069+00:00',
    slug: 'semantic-release-renovate',
    icon: 'code'
  },
  {
    id: 'cl2z2fks07xo20e18qriu4fyp',
    title: 'Next.jsにVitest + Testing Libraryを導入する手順と注意点',
    description:
      '今流行りのテストフレームワークであるVitestをTesting Libraryと併せて使ってみたので導入手順や注意点を記録として残しておきます。※vitestのバージョン0.12.4時点の情報です。',
    date: '2022-05-12',
    updatedAt: '2022-11-09T14:54:55.667256+00:00',
    slug: 'vitest-testing-library-20220512',
    icon: 'check'
  },
  {
    id: 'cl16nzvegb05l0b12t5acvps5',
    title: 'Slackアプリで作成者以外のユーザートークンを発行する',
    description:
      'Slackアプリで作成者以外のユーザートークンを発行する方法をまとめました。',
    date: '2022-04-07',
    updatedAt: '2022-10-27T11:45:20.545433+00:00',
    slug: 'slack-oauth-token-20220407',
    icon: 'pc'
  },
  {
    id: 'ckwrjvtqg7q210c86a9t0bmrj',
    title: 'Next.jsとGraphQLでブログを作った話',
    description:
      'Next.jsとGraphQLで個人ブログを作成しました。  公開するからには何かしら記事を書かなければいけないのでこのブログを作ったきっかけや使用した技術などを記録として残しておこうかと思います。',
    date: '2022-02-12',
    updatedAt: '2022-10-27T11:50:50.487882+00:00',
    slug: 'create-blog-20220212',
    icon: 'code'
  }
]

const Home = async () => {
  // const {
  //   data: { posts }
  // } = await getPosts()

  // console.log(posts)

  // try {
  //   await generatedRssFeed({ posts })
  // } catch (error) {
  //   console.log(error)
  // }

  return (
    <>
      <Seo
        path=""
        noTitleTemplate={true}
        title="nado"
        description="ナドの個人ブログ"
      />
      <DefaultLayout>
        <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Articles</h1>
        <div className={cc(['grid grid-cols-article md:gap-[30px] sm:gap-4'])}>
          {posts.map((post) => {
            return <Article key={post.id} {...post} />
          })}
        </div>
      </DefaultLayout>
    </>
  )
}

export default Home
