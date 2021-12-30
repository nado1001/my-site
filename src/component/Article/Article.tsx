import cc from 'classcat'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

type Props = {
  id: string
  // tag: Array<{ tagName: string; tagSlug: string }>
  title: string
  date: string
  slug: string
  length: number
}

/**
 * @package
 */
export const Article: VFC<Props> = (props) => {
  const { theme } = useTheme()

  return (
    <article
      className={cc([
        'bg-white dark:bg-darkBg03 dark:hover:bg-darkHoverBg01 hover:shadow-lg border dark:border-darkBorder01 border-border01 border-solid rounded-lg shadow-md md:min-h-[250px] sm:min-h-[186px]',
        // TODO: 1記事以上になったら削除
        { 'md:max-w-[308px]': props.length === 1 }
      ])}
    >
      <Link href={`/articles/${props.slug}`}>
        <a className="block w-full h-full">
          <div className="dark:bg-darkBg04 bg-bg02 flex justify-center items-center sm:py-4 md:py-6 dark:border-b-0 border-b border-border01 rounded-t-[6px]">
            <Image
              src={
                theme === 'dark' ? '/image/book_dark.svg' : '/image/book.svg'
              }
              alt="本"
              width="40"
              height="41"
            />
          </div>
          <div className="sm:p-[9px] md:px-4 md:py-7 text-[15px] rounded-b-[6px]">
            <span className="block text-right text-xs">
              {format(new Date(props.date), 'yyyy.MM.dd')}
            </span>
            <h2 className="mt-2 font-semibold">{props.title}</h2>
          </div>
        </a>
      </Link>
    </article>
  )
}
