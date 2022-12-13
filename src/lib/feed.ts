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
    image: `${baseUrl}/favicon.png`,
    favicon: `${baseUrl}/favicon.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`
    },
    author: author
  })

  posts.forEach((post) => {
    const url = `${baseUrl}/articles/${post.slug}`
    feed.addItem({
      title: post.title,
      description: post.description ?? '',
      id: url,
      link: url,
      date: new Date(post.date),
      image: `https://res.cloudinary.com/nado2022112/image/upload/l_text:Sawarabi%20Gothic_80_bold:${encodeURI(
        post.title
      )},co_rgb:333,w_1000,c_fit/v1641924252/article-ogp_keuplf.png`
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.rss2())
}
