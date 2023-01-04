/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nado1999.me',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  outDir: './out',
  generateIndexSitemap: false,
  additionalPaths: async () => {
    // const { getPosts } = require('./lib/posts')
    // const posts = await getPosts()
    // return posts.map((post) => ({
    //   loc: `https://nado1999.me/posts/${post.slug}`,
    //   lastmod: post.date,
    //   changefreq: 'daily',
    //   priority: 0.7
    // }))
    return [
      '/about',
      '/blog',
      '/blog/nextjs',
      '/blog/nextjs/next-sitemap',
      '/blog/nextjs/next-sitemap/next-sitemap-config',
      '/blog/nextjs/next-sitemap/next-sitemap-config/next-sitemap-config'
    ]
  }
}
