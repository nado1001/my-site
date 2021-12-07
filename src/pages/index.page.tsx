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
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-28 md:grid md:grid-cols-article md:gap-[50px]">
          <div className="md:max-w-[724px] md:col-start-1 md:col-end-2 sm:mx-4">
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
          <div className="md:max-w-[250px] md:col-start-2 md:col-end-3 md:pt-[68px] sm:mt-12">
            <Author />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
