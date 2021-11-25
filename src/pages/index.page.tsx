import type { NextPage } from 'next'

import { Seo } from '../component/Seo'
import { Layout } from '../layout'

const Home: NextPage = () => {
  return (
    <>
      <Seo path="/" title="Home" description="Homeです" />
      <Layout>
        <div>home</div>
      </Layout>
    </>
  )
}

export default Home
