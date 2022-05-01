import type { FC, ReactNode } from 'react'

import { Header } from './Header'
import { Menu } from './Header'

type Props = {
  children: ReactNode
}

/**
 * @package
 */
export const ArticleLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <main className="md:mx-[74px]">{children}</main>
    </div>
  )
}
