import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import type { VFC } from 'react'
import { useState } from 'react'

import { useIsomorphicEffect } from '../../hooks'

/**
 * @package
 */
export const ThemeChange: VFC = () => {
  const { theme, setTheme } = useTheme()
  const [enabled, setEnabled] = useState(false)

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }

    setEnabled(!enabled)
  }

  useIsomorphicEffect(() => {
    if (theme === 'light') {
      setEnabled(true)
    }
  }, [])

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleThemeChange}
        className={`${
          enabled ? 'bg-border01' : 'bg-darkBg01'
        } relative inline-flex flex-shrink-0 h-[28px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-crs ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${
            enabled ? 'translate-x-8' : 'translate-x-0'
          } pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
}
