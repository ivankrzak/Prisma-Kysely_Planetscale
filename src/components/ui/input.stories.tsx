/* eslint-disable i18next/no-literal-string */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { UserIcon } from 'components/icons'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { Input } from './input'

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address.' }),
})

type Props = {
  size: 'sm' | 'md' | 'lg'
  clearable: boolean
  withLeftAddon: boolean
  withRightAddon: boolean
}

const InputStory = ({ size, clearable, withLeftAddon, withRightAddon }: Props) => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })
  return (
    <Form {...formMethods}>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          void formMethods.handleSubmit((formData) => console.log(formData))
        }}
      >
        <FormField
          tooltip="Enter valid email address."
          required
          name="email"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  size={size}
                  leftAddon={withLeftAddon && <UserIcon className="w-5 h-5" />}
                  rightAddon={withRightAddon && <UserIcon className="w-5 h-5" />}
                  placeholder="Enter your email address"
                  clearable={clearable}
                />
              </FormControl>
              <FormDescription>We&apos;ll never share your personal information</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    clearable: true,
    size: 'md',
    withLeftAddon: true,
    withRightAddon: false,
  },
}

const meta: Meta<typeof InputStory> = {
  title: 'Input',
  component: InputStory,
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    clearable: { control: 'boolean' },
    withLeftAddon: { control: 'boolean' },
    withRightAddon: { control: 'boolean' },
  },
  render: (args) => <InputStory {...args} />,
}

export default meta
