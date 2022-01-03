import Image from 'next/image'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'

/**
 * @package
 */
export const Author: VFC = () => {
  const { theme } = useTheme()

  return (
    <div className="bg-white md:dark:bg-darkBg03 sm:dark:bg-darkBg01 md:border sm:border-t dark:border-darkBorder01 md:rounded-lg px-5 md:py-10 sm:pt-8 sm:pb-28 shadow-md">
      <div className="flex items-end">
        <Image
          src="/image/nado.svg"
          width="74"
          height="73"
          alt="nado"
          className=""
        />
        <div className="pl-4 pb-1">
          <span className="block pb-2 font-bold">ナド</span>
          <a
            href="https://twitter.com/nado_b1ue"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src={`/image/twitter${theme === 'dark' ? '_dark' : ''}.svg`}
              width="24"
              height="22"
              alt="twitter"
              className=""
            />
          </a>
          <a
            href="https://github.com/take-tech1001"
            target="_blank"
            className="ml-2 inline-block hover:opacity-80"
            rel="noreferrer"
          >
            <Image
              src={`/image/github${theme === 'dark' ? '_dark' : ''}.svg`}
              width="24"
              height="22"
              alt="github"
            />
          </a>
        </div>
      </div>
      <p className="pt-6">
        名古屋在住Webエンジニア
        <br />
        普段は東京の受託開発企業にリモートで勤務
        <br />
        好きな作家は三秋縋・河野裕
      </p>
    </div>
  )
}
