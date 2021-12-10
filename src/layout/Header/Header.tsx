import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

import { ThemeChange } from '../../component/ThemeChange'

/**
 * @package
 */
export const Header: VFC = () => {
  const { theme } = useTheme()

  return (
    <header className="bg-white dark:bg-darkBg02 dark:border-darkBorder01 md:dark:border-0 border-border01 border-b px-5 md:fixed md:w-full">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <a>
              <Image
                src={
                  theme === 'dark'
                    ? '/image/logo/logo_dark.svg'
                    : '/image/logo/logo.svg'
                }
                alt="nado.dev"
                width={97}
                height={72}
              />
            </a>
          </Link>
        </div>
        <ThemeChange />
      </div>
    </header>
  )
}
