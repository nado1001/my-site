import type { NextPage } from 'next'

import { Article } from '../component/Article'
import { Author } from '../component/Author'
import { Seo } from '../component/Seo'
import { Layout } from '../layout'

const Home: NextPage = () => {
  return (
    <>
      <Seo path="/" title="Home" description="Homeです" />
      <Layout>
        <div className="md:px-20 md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-28 md:grid md:grid-cols-2 md:gap-[50px]">
          <div className="md:max-w-[724px] md:col-span-2">
            <h1 className="font-bold text-4xl sm:py-8 md:pb-7">Articles</h1>
            <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-[30px] sm:gap-4">
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
            </div>
          </div>
          <div className="md:max-w-[250px] md:col-span-1">
            <Author />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
