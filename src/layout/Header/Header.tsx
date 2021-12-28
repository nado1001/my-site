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
    <header className="bg-white dark:bg-darkBg02 dark:border-darkBorder01 md:dark:border-0 border-border01 border-b h-[65px] flex flex-col justify-center md:px-10 sm:px-5 md:w-full z-50">
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
                alt="nado"
                width={68}
                height={39}
              />
            </a>
          </Link>
        </div>
        <ThemeChange />
      </div>
    </header>
  )
}
