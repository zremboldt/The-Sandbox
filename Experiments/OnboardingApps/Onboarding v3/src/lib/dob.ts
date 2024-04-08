import { isValid, differenceInYears } from 'date-fns'

export const DEFAULT_MAX_AGE = 110
export const DEFAULT_MIN_AGE = 14

const isValidDate = (date: Date): boolean => isValid(date)

function isYoungEnough({ dob, maxAge = DEFAULT_MAX_AGE }: { dob: Date; maxAge?: number }): boolean {
  const currentDate = new Date()
  const yearsSinceDob = differenceInYears(currentDate, dob)
  return yearsSinceDob <= maxAge
}

function isOldEnough({ dob, minAge = DEFAULT_MIN_AGE }: { dob: Date; minAge?: number }): boolean {
  const currentDate = new Date()
  const yearsSinceDob = differenceInYears(currentDate, dob)
  return yearsSinceDob >= minAge
}

export { isValidDate, isYoungEnough, isOldEnough }
