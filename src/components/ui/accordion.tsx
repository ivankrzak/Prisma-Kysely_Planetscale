import * as React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { TbQuestionMark } from 'react-icons/tb'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'

type AccordionVariant = 'flush' | 'default' | 'separated'

const accordionVariants = {
  root: cva('text-slate-500 dark:text-slate-400', {
    variants: {
      variant: {
        flush: '',
        default: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  item: cva('', {
    variants: {
      variant: {
        flush: 'last:border-b-0 border-b dark:border-slate-700 group',
        default: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  trigger: cva('', {
    variants: {
      variant: {
        flush:
          '[&>svg]:text-slate-900 dark:[&[data-state=open]>div>svg]:text-white dark:[&>svg]:text-slate-400 dark:[&[data-state=open]>svg]:text-white dark:[&[data-state=open]]:text-white [&>div>svg]:text-slate-800 dark:[&>div>svg]:text-slate-400',
        default: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  content: cva('', {
    variants: {
      variant: {
        flush: 'border-t dark:border-slate-700 group-last:border-t-0',
        default: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
}

const AccordionContext = React.createContext<AccordionVariant>('default')

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
    VariantProps<typeof accordionVariants.root>
>(({ className, variant, ...props }, ref) => (
  <AccordionContext.Provider value={variant || 'default'}>
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(accordionVariants.root({ variant }), className)}
      {...props}
    />
  </AccordionContext.Provider>
))

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionVariants.item({ variant }), className)}
      {...props}
    />
  )
})
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          accordionVariants.trigger({ variant }),
          'flex flex-1 items-center text-lg justify-between py-5 font-medium transition-all [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        <div className="flex gap-2 items-center">
          <TbQuestionMark className="w-6 h-6 shrink-0 transition-all" />
          {children}
        </div>
        <HiChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        accordionVariants.content({ variant }),
        'overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      <div className="py-5">{children}</div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
