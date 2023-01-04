import Link from 'next/link'
import { ReactNode } from 'react'

export const CustomLink = ({
  children,
  href
}: {
  children: ReactNode
  href: string
}): JSX.Element =>
  href.startsWith('/') || href === '' ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
