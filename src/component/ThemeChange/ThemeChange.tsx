import { Switch, Tooltip } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { useTheme } from 'next-themes'
import type { FC } from 'react'
import { useState } from 'react'

import { useIsomorphicEffect } from '../../hooks'

/**
 * @package
 */
export const ThemeChange: FC = () => {
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

  useHotkeys([['mod+J', () => handleThemeChange()]])

  useIsomorphicEffect(() => {
    if (theme === 'dark') {
      setEnabled(true)
    }
  }, [])

  return (
    <div>
      <Tooltip label="⌘ + J" openDelay={500}>
        <Switch
          checked={enabled}
          onChange={handleThemeChange}
          size="lg"
          classNames={{
            input: 'cursor-pointer'
          }}
        />
      </Tooltip>
    </div>
  )
}
