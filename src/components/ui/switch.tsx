import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'

const switchVariants = cva(
  cn(
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200',
    'dark:data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:bg-slate-600',
    'disabled:cursor-not-allowed',
  ),
  {
    variants: {
      size: {
        sm: 'h-5 w-10',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const switchThumbVariants = cva(
  cn(
    'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
    'data-[state=unchecked]:translate-x-0 data-[state=checked]:dark:bg-white dark:bg-slate-400',
  ),
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-5',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & VariantProps<typeof switchVariants>
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root className={cn(switchVariants({ size }), className)} {...props} ref={ref}>
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
