'use client'

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import cc from 'classcat'
import type { FC } from 'react'

import { useTableOfContentState } from '@/states/store'

type TableOfContentList = {
  tag: string
  slug: string
  name: string
}

type Props = {
  tableofcontent: TableOfContentList[]
  className?: string
  isPc: boolean
}

type PresentationProps = Omit<Props, 'isPc'> & {
  onClick(): void
}

/**
 * @package
 */
export const TableOfContent: FC<Props> = (props) => {
  const { tableofcontent, className, isPc } = props

  const { open, setOpen } = useTableOfContentState()
  const handleClick = () => {
    setOpen()
  }

  if (isPc) {
    return (
      <Presentation
        tableofcontent={tableofcontent}
        className={className}
        onClick={handleClick}
      />
    )
  }

  return (
    <>
      <div className="w-full h-12 flex justify-start bg-white-primary dark:bg-headerDark px-5 border-b border-borderGray dark:border-borderGrayDark">
        <button className="flex items-center" onClick={handleClick}>
          <div className="w-5 mr-2">
            <Bars3BottomLeftIcon />
          </div>
          <div>目次</div>
        </button>
      </div>
      {open && (
        <>
          <button
            className="h-screen w-full fixed top-0 dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.2)]"
            onClick={handleClick}
          />
          <Presentation
            tableofcontent={tableofcontent}
            className=""
            onClick={handleClick}
          />
        </>
      )}
    </>
  )
}

const Presentation: FC<PresentationProps> = (props) => {
  const { tableofcontent, className, onClick } = props
  const handleClick = () => {
    onClick()
  }

  return (
    <div className={cc([`${className} md:sticky md:top-8`])}>
      <div className="bg-white-primary dark:bg-cardDark border dark:border-borderGrayDark rounded-lg px-5 pt-5 pb-10 shadow-md absolute md:static top-4 md:top-auto left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 w-[calc(100%-100px)] md:w-auto">
        <span className="pc-only font-bold text-xl">目次</span>
        <ul
          className="mt-5 list-inside leading-8"
          style={{ listStyleType: 'circle' }}
        >
          {tableofcontent?.map((content: TableOfContentList, index: number) => {
            return (
              <li
                key={content.name}
                className={cc([
                  '-indent-6 pl-6 leading-6',
                  content.tag === 'h2'
                    ? 'font-bold text-[15px]'
                    : 'text-sm ml-4',
                  { 'mt-2': index !== 0 }
                ])}
              >
                <a href={`#${content.slug}`} onClick={handleClick}>
                  {content.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
