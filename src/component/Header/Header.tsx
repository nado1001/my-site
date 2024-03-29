'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { FC } from 'react'

import { useMenuState } from '@/states/store'

import { ThemeChange } from '../ThemeChange'

/**
 * @package
 */
export const Header: FC = () => {
  const { theme } = useTheme()
  const { open, setOpen } = useMenuState()

  const handleSetMenu = (): void => {
    setOpen()
  }

  return (
    <header className="bg-white-primary dark:bg-headerDark dark:border-borderGrayDark md:dark:border-0 border-borderGray border-b h-[65px] flex flex-col justify-center md:px-10 px-5 md:w-full z-50">
      <div className="flex items-center justify-between">
        <div className="md:flex md:items-center md:justify-between md:w-[127px]">
          <button
            className="pc-only w-12 mr-[10px] p-[10px] rounded-[50%] dark:hover:bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(0,0,0,0.04)]"
            onClick={handleSetMenu}
          >
            {open ? <XMarkIcon /> : <Bars3Icon />}
          </button>
          <Link href="/">
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
          </Link>
        </div>
        <ThemeChange />
      </div>
    </header>
  )
}
