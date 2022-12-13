import { ReactNode } from 'react'

import { DefaultLayout } from '../DefaultLayout'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <DefaultLayout>{children}</DefaultLayout>
}
