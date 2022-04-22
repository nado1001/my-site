import type { Meta, Story } from '@storybook/react/types-6-0'
import { format } from 'date-fns'
import React from 'react'

import { TableOfContent } from './TableOfContent'

export default {
  title: 'Component/TableOfContent',
  component: TableOfContent
} as Meta

const Template: Story = (args) => (
  <TableOfContent tableofcontent={args.tableofcontent} />
)

export const Default = Template.bind({})
Default.args = {
  tableofcontent: [
    {
      tag: 'h2',
      slug: 'slug',
      name: 'h2'
    },
    {
      tag: 'h3',
      slug: 'slug',
      name: 'h3'
    }
  ]
}
