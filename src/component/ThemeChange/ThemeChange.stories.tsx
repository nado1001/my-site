import type { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ThemeChange } from './ThemeChange'

export default {
  title: 'Component/ThemeChange',
  component: ThemeChange
} as Meta

const Template: Story = () => <ThemeChange />

export const Default = Template.bind({})
