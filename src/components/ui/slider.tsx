import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from 'lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { isRange?: boolean }
>(({ className, isRange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
      <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 drop-shadow-sm rounded-full border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-600 ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none" />
    {isRange && (
      <SliderPrimitive.Thumb className="block h-5 w-5 drop-shadow-sm rounded-full border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-600 ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none" />
    )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
