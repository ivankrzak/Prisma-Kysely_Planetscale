import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { CloseIcon } from 'components/icons'
import { useFormField } from './form'

const inputWrapperVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'h-[37px] text-sm',
      md: 'h-[42px] text-sm',
      lg: 'h-[52px] text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputWrapperVariants> & {
    leftAddon?: React.ReactNode
    rightAddon?: React.ReactNode
    clearable?: boolean
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, type, size, leftAddon, rightAddon, clearable, ...props }, ref) => {
    const showRightAddon = rightAddon && !clearable
    const isRightElementPresent = showRightAddon || (clearable && value)

    const { resetField, getFieldState } = useFormContext()
    const { name } = useFormField()
    const { invalid } = getFieldState(name)

    return (
      <div
        className={cn(
          'flex items-center overflow-hidden border rounded-md border-slate-200',
          'dark:border-slate-600 dark:focus-within:border-blue-500',
          'focus-within:border-blue-600',
          invalid && 'border-red-500 focus-within:border-red-500 dark:focus-within:border-red-500',
          inputWrapperVariants({ size }),
        )}
      >
        {leftAddon && (
          <div
            className={cn(
              'text-slate-500 ps-4 h-full flex items-center justify-center bg-slate-50 shrink-0',
              'dark:text-slate-400 dark:bg-slate-900',
            )}
          >
            {leftAddon}
          </div>
        )}
        <input
          formNoValidate
          value={value}
          type={type}
          className={cn(
            'flex w-full h-full bg-slate-50 text-slate-900 px-4 py-2 placeholder:text-slate-500',
            'focus-visible:outline-none',
            'dark:text-white dark:bg-slate-900 dark:disabled:placeholder-slate-500 dark:disabled:text-slate-500 dark:placeholder:text-slate-400',
            'disabled:placeholder-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed',
            leftAddon && 'ps-2.5',
            isRightElementPresent && 'pe-2.5',
            className,
          )}
          ref={ref}
          {...props}
        />
        {showRightAddon && (
          <div
            className={cn(
              'text-slate-500 pe-4 h-full flex items-center justify-center bg-slate-50 shrink-0',
              'dark:text-slate-400 dark:bg-slate-900',
            )}
          >
            {rightAddon}
          </div>
        )}
        {clearable && value && (
          <div
            className={cn(
              'text-slate-500 pe-4 h-full flex items-center justify-center bg-slate-50 shrink-0',
              'dark:text-slate-400 dark:bg-slate-900',
            )}
          >
            <CloseIcon
              onClick={() => resetField(name)}
              className="text-slate-500 dark:text-slate-400 w-5 h-5 cursor-pointer shrink-0"
            />
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
