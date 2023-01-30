import { ReactNode } from 'react'

import { ArticleLayout } from './ArticleLayout'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <ArticleLayout>{children}</ArticleLayout>
}
