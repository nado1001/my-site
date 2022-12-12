import type { FC, ReactNode } from 'react'

import { Author } from '../component/Author'
import { Header, Menu } from '../component/Header'

type Props = {
  children: ReactNode
}

/**
 * @package
 */
export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <main className="md:mx-[74px]">
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-12 flex sm:flex-col sm:min-h-screen">
          <div className="md:max-w-[724px] md:w-full md:col-start-1 md:col-end-2 sm:mx-4 sm:mb-32 sm:flex-1">
            {children}
          </div>
          <aside className="md:max-w-[250px] md:col-start-2 md:col-end-3 md:pt-[68px] md:ml-[50px]">
            <Author />
          </aside>
        </div>
      </main>
    </div>
  )
}
