import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import { useProfileStore } from 'src/hooks/profile-store'
import { DobInputDay, DobInputGroup, DobInputMonth, DobInputYear } from 'src/components/input-dob'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRef } from 'react'

const FormSchema = z.object({
  month: z
    .string()
    .min(2, {
      message: 'Month must be 2 digits long',
    })
    .max(2, {
      message: 'Month must be 2 digits long',
    }),
  day: z
    .string()
    .min(2, {
      message: 'Day must be 2 digits long',
    })
    .max(2, {
      message: 'Day must be 2 digits long',
    }),
  year: z
    .string()
    .min(4, {
      message: 'Year must be 4 digits long',
    })
    .max(4, {
      message: 'Year must be 4 digits long',
    }),
})

export default function DobScene() {
  const navigate = useNavigate()
  const updateDob = useProfileStore((state) => state.updateDob)
  const { register, formState, handleSubmit } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      month: '',
      day: '',
      year: '',
    },
  })
  const { ref: hookFormDayRef, onChange: hookFormOnDayChange, ...restDay } = register('day')
  const { ref: hookFormYearRef, onChange: hookFormOnYearChange, ...restYear } = register('year')
  const dayRef = useRef(null)
  const yearRef = useRef(null)

  const onSubmit = (data) => {
    const dob = new Date(data.year, data.month - 1, data.day)

    // if (isNaN(dob.getTime())) {
    //   return json({ errors: { dob: 'Please enter a valid date' } }, { status: 400 })
    // }

    // // ensure user is at least 18
    // const eighteenYearsAgo = new Date()
    // eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

    // if (dob.getTime() > eighteenYearsAgo.getTime()) {
    //   return json({ errors: { dob: 'You must be at least 18 years old' } }, { status: 400 })
    // }

    console.log(dob)

    return

    updateDob(dob)
    navigate('/address')
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '') // don't allow non-numeric characters

    if (e.target.value.length === 1 && parseInt(e.target.value) > 1) {
      e.target.value = `0${e.target.value}` // first digits greater than 1 are prefixed with a 0
    }

    if (e.target.value.length === 2 && parseInt(e.target.value) > 12) {
      e.target.value = e.target.value.replace(/.$/, '') // don't allow a total digit greater than 12
      return
    }

    if (e.target.value.length === 2) {
      dayRef.current?.focus()
    }
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '') // don't allow non-numeric characters

    if (e.target.value.length === 1 && parseInt(e.target.value) > 3) {
      e.target.value = `0${e.target.value}` // first digits greater than 3 are prefixed with a 0
    }

    if (e.target.value.length === 2 && parseInt(e.target.value) > 31) {
      e.target.value = e.target.value.replace(/.$/, '') // don't allow a total digit greater than 31
      return
    }

    if (e.target.value.length === 2) {
      yearRef.current?.focus()
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '') // don't allow non-numeric characters

    if (e.target.value.length === 1) {
      if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 2) {
        e.target.value = '' // don't allow a first digit less than 1 or greater than 2
      }
      return
    }

    if (e.target.value.length === 2) {
      if (parseInt(e.target.value) < 19 || parseInt(e.target.value) > 20) {
        e.target.value = e.target.value.replace(/.$/, '') // don't allow the second digit total to equal less than 19 or more than 20
      }
      return
    }
  }

  const errors = formState.errors

  return (
    <>
      <Helmet>
        <title>{'Birthday | Root Insurance'}</title>
      </Helmet>
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h2 className="text-3xl">When’s your birthday?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 relative">
          <DobInputGroup>
            <DobInputMonth
              {...register('month', {
                onChange: handleMonthChange,
              })}
            />
            <DobInputDay
              {...restDay}
              name="day"
              onChange={(e) => {
                hookFormOnDayChange(e)
                handleDayChange(e)
              }}
              ref={(e) => {
                hookFormDayRef(e)
                dayRef.current = e
              }}
            />
            <DobInputYear
              {...restYear}
              name="year"
              onChange={(e) => {
                hookFormOnYearChange(e)
                handleYearChange(e)
              }}
              ref={(e) => {
                hookFormYearRef(e)
                yearRef.current = e
              }}
            />
          </DobInputGroup>

          {(errors.month?.message || errors.day?.message || errors.year?.message) && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              {errors.month?.message || errors.day?.message || errors.year?.message}
            </p>
          )}
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </>
  )
}
