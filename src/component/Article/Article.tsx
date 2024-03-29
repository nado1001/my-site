import cc from 'classcat'
import { format } from 'date-fns'
import Link from 'next/link'
import type { FC } from 'react'

import { ArchiveCardIcon } from '../Icon/ArchiveCardIcon'

type Props = {
  id: string
  title: string
  date: string
  slug: string
  icon?: string | null
}

/**
 * @package
 */
export const Article: FC<Props> = (props) => {
  const { title, date, slug, icon } = props

  return (
    <article
      className={cc([
        'bg-white-primary dark:bg-cardDark dark:hover:bg-[#414142] hover:shadow-lg border dark:border-borderGrayDark border-borderGray border-solid rounded-lg shadow-md md:min-h-[250px] sm:min-h-[186px]'
      ])}
    >
      <Link
        href={`/articles/${slug}`}
        className="block w-full h-full"
        data-testid="article-nav"
      >
        <div className="dark:bg-cardHeadDark bg-cardHeadLight flex justify-center items-center py-4 md:py-6 dark:border-b-0 border-b border-borderGray rounded-t-[6px]">
          <ArchiveCardIcon
            icon={icon}
            className="w-10 dark:text-white-primary text-[#757575]"
          />
        </div>
        <div className="p-[9px] md:px-4 md:py-7 text-[15px] rounded-b-[6px]">
          <span className="block text-right text-xs" data-testid="article-date">
            {format(new Date(date), 'yyyy.MM.dd')}
          </span>
          <h2 className="mt-2 font-semibold">{title}</h2>
        </div>
      </Link>
    </article>
  )
}
