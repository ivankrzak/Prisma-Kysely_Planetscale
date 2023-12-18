/* eslint-disable i18next/no-literal-string */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { Slider } from './slider'

const formSchema = z.object({
  amount: z.number().array().optional(),
})

const SliderStory = () => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: [30, 70],
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
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 p-4">
              <FormControl>
                <Slider
                  {...field}
                  isRange
                  onValueChange={field.onChange}
                  min={0}
                  max={1000}
                  step={1}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept amount and conditions</FormLabel>
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

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <SliderStory />,
}

const meta: Meta<typeof Slider> = {
  title: 'Slider',
  component: Slider,
}

export default meta
