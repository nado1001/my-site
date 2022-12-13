import { ReactNode } from 'react'

import { ArticleLayout } from './ArticleLayout'

type Props = {
  children: ReactNode
}

export const revalidate = 3600

export default function Layout({ children }: Props) {
  return <ArticleLayout>{children}</ArticleLayout>
}
