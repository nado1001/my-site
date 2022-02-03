import { Feed } from 'feed'
import fs from 'fs'

import type { GetPostsQuery } from '../apollo/graphql'

export const generatedRssFeed = async ({ posts }: GetPostsQuery) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const date = new Date()

  const author = {
    name: 'nado',
    email: 'tk.text1001@gmail.com',
    link: baseUrl
  }

  // デフォルトになる feed の情報
  const feed = new Feed({
    title: 'nado',
    description: 'ナドの個人ブログ',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`
    },
    author: author
  })

  posts.forEach((post) => {
    const url = `${baseUrl}/${post.slug}`
    feed.addItem({
      title: post.title,
      description: post.description,
      id: url,
      link: url,
      date: new Date(post.date)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.rss2())
}
