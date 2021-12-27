import { HomeIcon } from '@heroicons/react/solid'
import { TagIcon } from '@heroicons/react/solid'
import cc from 'classcat'
import Link from 'next/link'
import type { VFC } from 'react'
import { createElement } from 'react'

const menuList = [
  {
    id: 1,
    link: '/',
    icon: HomeIcon,
    text: 'ホーム'
  },
  {
    id: 2,
    link: '/tag',
    icon: TagIcon,
    text: 'タグ'
  }
]

/**
 * @package
 */
export const Menu: VFC = () => {
  return (
    <nav className="md:hidden md:dark:bg-darkBg02 sm:dark:bg-darkBg01 sm:bg-white sm:border-t dark:border-darkBorder01 fixed border-border01 sm:bottom-0 sm:flex sm:items-center sm:w-screen sm:py-[14px] z-50">
      {menuList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={cc([{ 'md:pt-8': index !== 0 }, 'sm:w-1/2'])}
          >
            <Link href={item.link}>
              <a className="flex flex-col items-center">
                {createElement(item.icon, { className: 'h-6 w-6' })}
                <span className="text-[12px]">{item.text}</span>
              </a>
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
