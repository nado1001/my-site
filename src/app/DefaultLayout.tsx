import type { FC, ReactNode } from 'react'

import { Author } from '@/component/Author'
import { Header, Menu } from '@/component/Header'

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
        <div className="md:max-w-screen-lg md:mx-auto md:pb-12 md:pt-12 flex flex-col md:flex-row min-h-screen">
          <div className="md:max-w-[724px] md:w-full md:mx-0 mx-4 mb-32 flex-1">
            {children}
          </div>
          <aside className="md:max-w-[250px] md:pt-[68px] md:ml-[50px]">
            <Author />
          </aside>
        </div>
      </main>
    </div>
  )
}
