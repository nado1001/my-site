import { Feed } from 'feed'
import fs from 'fs'

import type { GetPostsQuery } from '../apollo/graphql'
// import { MarkdownToHtml } from '../component/MarkdownToHtml'

type Post = {
  __typename?: 'Post'
  id: string
  title: string
  content: string
  date: any
  updatedAt: any
  slug: string
  icon?: string
}

export const generatedRssFeed = async ({ posts }: GetPostsQuery) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const date = new Date()
  // author の情報を書き換える
  const author = {
    name: 'nado',
    email: 'tk.text1001@gmail.com',
    link: baseUrl
  }

  // デフォルトになる feed の情報
  const feed = new Feed({
    title: process.env.NEXT_PUBLIC_BASE_NAME || '',
    description: process.env.NEXT_PUBLIC_BASE_DISC,
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.png`, // image には OGP 画像でなくファビコンを指定
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`
    },
    author: author
  })

  // feed で定義した情報から各記事での変更点を宣言
  posts.forEach((post: Post) => {
    // post のプロパティ情報は使用しているオブジェクトの形式に合わせる
    const url = `${baseUrl}/${post.slug}`
    feed.addItem({
      title: post.title,
      description: 'description',
      id: url,
      link: url,
      content: post.content, // marked で markdown => html
      date: new Date(post.date)
    })
  })

  // フィード情報を public/rss 配下にディレクトリを作って保存
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
}
