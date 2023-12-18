import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { HelloQuery, HelloQueryVariables } from 'apollo/generated/graphqlClient'
import { graphql } from 'msw'
import Hello from './Hello'

const meta: Meta<typeof Hello> = {
  title: 'Hello',
  component: Hello,
}

export default meta

type Story = StoryObj<typeof Hello>

export const Default: Story = {
  render: (args) => <Hello {...args} />,
}

Default.parameters = {
  msw: {
    handlers: {
      hello: graphql.query<HelloQuery, HelloQueryVariables>('Hello', (req, res, ctx) => {
        const { message } = req.variables
        return res(
          ctx.data({
            hello: `Hello! Your message is ${message}`,
          }),
        )
      }),
    },
  },
}

Default.args = {
  message: 'Hi!',
}
