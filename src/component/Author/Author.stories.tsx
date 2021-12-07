import type { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Author } from './Author'

export default {
  title: 'Component/Author',
  component: Author
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // }
} as Meta

const Template: Story = () => <Author />

export const Primary = Template.bind({})
// Primary.args = {
//   primary: true,
//   label: 'Button'
// }
