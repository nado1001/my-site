import type { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Author } from './Author'

export default {
  title: 'Component/Author',
  component: Author
} as Meta

const Template: Story = () => <Author />

export const Default = Template.bind({})
