/* eslint-disable i18next/no-literal-string */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { Switch } from './switch'

const formSchema = z.object({
  terms: z.boolean().default(false).optional(),
})

const SwitchStory = () => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  })

  return (
    <Form {...formMethods}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void formMethods.handleSubmit((formData) => console.log(formData))
        }}
        className="space-y-6"
      >
        <FormField
          control={formMethods.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 p-4">
              <FormControl>
                <Switch
                  size="md"
                  disabled={field.disabled}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => <SwitchStory />,
}

const meta: Meta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
}

export default meta
