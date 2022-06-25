import { Switch, useMantineTheme } from '@mantine/core'
import { useTheme } from 'next-themes'
import type { FC } from 'react'
import { useState } from 'react'

import { useIsomorphicEffect } from '../../hooks'

/**
 * @package
 */
export const ThemeChange: FC = () => {
  const mantineTheme = useMantineTheme()
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
    if (theme === 'dark') {
      setEnabled(true)
    }
  }, [])

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleThemeChange}
        color={mantineTheme.colors.dark[1]}
        size="lg"
        defaultChecked={!enabled}
      />
    </div>
  )
}
