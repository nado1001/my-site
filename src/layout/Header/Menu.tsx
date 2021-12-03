import cc from 'classcat'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

const menuList = [
  {
    id: 1,
    link: '/',
    image: 'home',
    text: 'ホーム'
  },
  {
    id: 2,
    link: '/tag',
    image: 'tag',
    text: 'タグ'
  }
]

/**
 * @package
 */
export const Menu: VFC = () => {
  const { theme } = useTheme()

  return (
    <nav className="md:dark:bg-darkBg02 sm:dark:bg-darkBg01 sm:bg-white sm:border-t dark:border-darkBorder01 fixed md:w-[72px] md:h-screen md:py-5 md:dark:border-r-0 md:border-r border-border01 sm:bottom-0 sm:flex sm:items-center sm:w-screen sm:py-[14px]">
      {menuList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={cc([{ 'md:pt-8': index !== 0 }, 'sm:w-1/2'])}
          >
            <Link href={item.link}>
              <a className="flex flex-col items-center">
                <Image
                  src={
                    theme === 'dark'
                      ? `/image/${item.image}_dark.svg`
                      : `/image/${item.image}.svg`
                  }
                  alt={item.image}
                  width={24}
                  height={24}
                />
                <span className="text-[12px]">{item.text}</span>
              </a>
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
