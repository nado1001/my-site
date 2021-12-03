import type { ReactNode, VFC } from 'react'

import { Header } from './Header'
import { Menu } from './Header'

type Props = {
  children: ReactNode
}

/**
 * @package
 */
export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <main className="md:mx-[74px] sm:mx-4">{children}</main>
    </div>
  )
}
