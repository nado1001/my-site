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
      <main className="px-[74px]">{children}</main>
    </div>
  )
}
