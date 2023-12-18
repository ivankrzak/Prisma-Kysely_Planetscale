/* eslint-disable i18next/no-literal-string */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { RadioGroup, RadioGroupItem } from './radio-group'

const formSchema = z.object({
  radioGroup: z.enum(['option1', 'option2', 'option3'], {
    required_error: 'You need to select a notification type.',
  }),
})

const RadioGroupStory = () => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radioGroup: 'option1',
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
          name="radioGroup"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>All new messages</FormLabel>
                      <FormDescription>Radio group option description example.</FormDescription>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Direct messages and mentions</FormLabel>
                      <FormDescription>Radio group option description example.</FormDescription>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Nothing</FormLabel>
                      <FormDescription>Radio group option description example.</FormDescription>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => <RadioGroupStory />,
}

const meta: Meta<typeof RadioGroup> = {
  title: 'RadioGroup',
  component: RadioGroup,
}

export default meta
