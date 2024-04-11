import { Input } from './ui/input'
import React from 'react'
import { cn } from 'src/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DobInputGroup = React.forwardRef<HTMLDivElement, InputProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className="flex" {...props}>
    {children}
  </div>
))

const DobInputMonth = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn('relative flex-1 rounded-r-none', className)}
    autoComplete="off"
    placeholder="MM"
    maxLength={2}
    {...props}
  />
))

const DobInputDay = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn('flex-1 rounded-none border-x-transparent focus-visible:z-10', className)}
    autoComplete="off"
    placeholder="DD"
    maxLength={2}
    {...props}
  />
))

const DobInputYear = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn('flex-1 rounded-l-none', className)}
    autoComplete="off"
    placeholder="YYYY"
    maxLength={4}
    {...props}
  />
))

export { DobInputGroup, DobInputMonth, DobInputDay, DobInputYear }
