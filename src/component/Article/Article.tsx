import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

/**
 * @package
 */
export const Article: VFC = () => {
  const { theme } = useTheme()

  return (
    <article className="dark:bg-darkBg03 dark:hover:bg-darkHoverBg01 hover:shadow-lg border dark:border-darkBorder01 border-border01 border-solid rounded-lg shadow-md">
      <Link href="/articles/1">
        <a className="block">
          <div className="dark:bg-darkBg04 bg-bg01 flex justify-center items-center sm:py-4 md:py-6 dark:border-b-0 border-b border-border01 rounded-t-[6px]">
            <Image
              src={
                theme === 'dark' ? '/image/book_dark.svg' : '/image/book.svg'
              }
              alt="本"
              width="40"
              height="41"
            />
          </div>
          <div className="sm:p-[9px] md:px-2 md:py-7 text-[15px] rounded-b-[6px]">
            <span className="block text-right text-xs">2021.11.16</span>
            <h2 className="mt-2">
              タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
            </h2>
          </div>
        </a>
      </Link>
    </article>
  )
}
