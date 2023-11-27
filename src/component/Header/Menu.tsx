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
        'md:dark:bg-headerDark dark:bg-backgroundDark md:w-[240px] md:py-6 bg-white-primry border-t dark:border-borderGrayDark fixed md:absolute md:top-[60px] md:left-12 border-borderGray bottom-0 md:bottom-auto flex items-center w-screen py-[14px] z-50 md:border md:rounded-lg'
      ])}
    >
      {menuList.map((item) => {
        return (
          <div key={item.id} className={cc(['w-1/2 md:w-auto md:h-[45px]'])}>
            <Link
              href={item.link}
              className="flex flex-col md:flex-row items-center px-6 md:h-full md:w-full md:dark:hover:bg-[rgba(255,255,255,0.08)] md:hover:bg-[rgba(0,0,0,0.04)]"
              onClick={handleSetMenu}
            >
              {createElement(item.icon, {
                className: 'h-6 w-6 dark:text-white-primary text-[#757575]'
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
