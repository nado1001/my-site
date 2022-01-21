import cc from 'classcat'
import type { VFC } from 'react'

import { useTableOfContentState } from '../../states/store'

type TableOfContentList = {
  tag: string
  slug: string
  name: string
}

type Props = {
  tableofcontent: TableOfContentList[]
  className?: string
}

/**
 * @package
 */
export const TableOfContent: VFC<Props> = (props) => {
  const { setOpen } = useTableOfContentState()
  const handleClickOpen = () => {
    setOpen()
  }

  return (
    <div className={cc([`${props.className} md:sticky md:top-8`])}>
      <div className="bg-white dark:bg-darkBg03 border dark:border-darkBorder01 rounded-lg px-5 pt-5 pb-10 shadow-md sm:absolute sm:top-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-[calc(100%-100px)]">
        <span className="sm:hidden block font-bold text-xl">目次</span>
        <ul
          className="mt-5 list-inside leading-8"
          style={{ listStyleType: 'circle' }}
        >
          {props.tableofcontent.map(
            (content: TableOfContentList, index: number) => {
              return (
                <li
                  key={content.name}
                  className={cc([
                    '-indent-6 pl-6',
                    content.tag === 'h2'
                      ? 'font-bold text-lg'
                      : 'text-base ml-4',
                    { 'mt-2': index !== 0 }
                  ])}
                >
                  <a href={`#${content.slug}`} onClick={handleClickOpen}>
                    {content.name}
                  </a>
                </li>
              )
            }
          )}
        </ul>
      </div>
    </div>
  )
}
