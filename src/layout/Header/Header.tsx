import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

import { ThemeChange } from '../../component/ThemeChange'
import { useMenuState } from '../../states/store'

/**
 * @package
 */
export const Header: VFC = () => {
  const { theme } = useTheme()
  const { open, setOpen } = useMenuState()

  const handleSetMenu = (): void => {
    setOpen()
  }

  return (
    <header className="bg-white dark:bg-darkBg02 dark:border-darkBorder01 md:dark:border-0 border-border01 border-b h-[65px] flex flex-col justify-center md:px-10 sm:px-5 md:w-full z-50">
      <div className="flex items-center justify-between">
        <div className="md:flex md:items-center md:justify-between md:w-[127px]">
          <button
            className="sm:hidden w-12 mr-[10px] p-[10px] rounded-[50%] dark:hover:bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(0,0,0,0.04)]"
            onClick={handleSetMenu}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
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
