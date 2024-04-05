import { Input } from './ui/input'
import React from "react";
import { cn } from 'src/lib/utils';

const DobInputGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className='flex' 
      {...props}
    >
      {children}
    </div>
  )
})

const DobInputMonth = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "relative flex-1 rounded-r-none",
        className,
      )}
      autoComplete='off'
      placeholder="MM"
      {...props}
    />
  )
})

const DobInputDay = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "flex-1 rounded-none border-x-transparent focus-visible:z-10",
        className,
      )}
      autoComplete='off'
      placeholder="DD"
      {...props}
    />
  )
})

const DobInputYear = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "flex-1 rounded-l-none",
        className,
      )}
      autoComplete='off'
      placeholder="YYYY"
      {...props}
    />
  )
})

export { DobInputGroup, DobInputMonth, DobInputDay, DobInputYear };