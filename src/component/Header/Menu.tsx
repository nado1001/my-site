'use client'

import { HomeIcon } from '@heroicons/react/24/solid'
import { TagIcon } from '@heroicons/react/24/solid'
import cc from 'classcat'
import Link from 'next/link'
import type { FC } from 'react'
import { createElement } from 'react'

import { useMenuState } from '@/states/store'

const menuList = [
  {
    id: 1,
    link: '/',
    icon: HomeIcon,
    text: 'ホーム'
  },
  {
    id: 2,
    link: '/tags',
    icon: TagIcon,
    text: 'タグ'
  }
]

/**
 * @package
 */
export const Menu: FC = () => {
  const { open, setOpen } = useMenuState()

  const handleSetMenu = (): void => {
    setOpen()
  }

  return (
    <nav
      className={cc([
        open ? 'md:block' : 'md:hidden',
        'md:dark:bg-darkBg02  sm:dark:bg-darkBg01 md:w-[240px] md:py-6 bg-white sm:border-t dark:border-darkBorder01 sm:fixed md:absolute md:top-[60px] md:left-12 border-border01 sm:bottom-0 sm:flex sm:items-center sm:w-screen sm:py-[14px] z-50 md:border md:rounded-lg'
      ])}
    >
      {menuList.map((item) => {
        return (
          <div key={item.id} className={cc(['sm:w-1/2 md:h-[45px]'])}>
            <Link
              href={item.link}
              className="flex sm:flex-col items-center px-6 md:h-full md:w-full md:dark:hover:bg-[rgba(255,255,255,0.08)] md:hover:bg-[rgba(0,0,0,0.04)]"
              onClick={handleSetMenu}
            >
              {createElement(item.icon, {
                className: 'h-6 w-6 dark:text-white text-[#757575]'
              })}
              <span className="text-[12px] md:ml-[25px] md:text-[15px]">
                {item.text}
              </span>
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
