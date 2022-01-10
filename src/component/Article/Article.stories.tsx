import type { Meta, Story } from '@storybook/react/types-6-0'
import { format } from 'date-fns'
import React from 'react'

import { Article } from './Article'

export default {
  title: 'Component/Article',
  component: Article
} as Meta

const Template: Story = (args) => (
  <Article id={args.id} title={args.title} date={args.date} slug={args.date} />
)

export const Default = Template.bind({})
Default.args = {
  id: '1',
  title: 'Test Title',
  date: format(new Date(), 'yyyy.MM.dd'),
  slug: 'test'
}
