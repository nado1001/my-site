import type { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Article } from './Article'

export default {
  title: 'Component/Article',
  component: Article
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // }
} as Meta

const Template: Story = () => <Article />

export const Primary = Template.bind({})
// Primary.args = {
//   primary: true,
//   label: 'Button'
// }
