import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { AsterixIcon, TooltipIcon } from 'components/icons'

const labelVariants = cva(
  'inline-block text-sm font-medium text-slate-600 dark:text-white leading-none',
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { required?: boolean; tooltip?: string }
>(({ className, children, required, tooltip, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
    <div className="flex items-center gap-0.5">
      {children}
      {required && <AsterixIcon className="text-blue-600 dark:text-blue-500 w-3 h-3" />}
      {/* Temporary tooltip - will be done in separate PR */}
      {tooltip && <TooltipIcon className="text-slate-500 dark:text-slate-400 w-4 h-4 ml-1" />}
    </div>
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
