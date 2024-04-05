import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import useLocalStorageState from 'src/hooks/use-localstorage-state'
import { Input } from 'src/components/ui/input'

export default function DobScene() {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm()
  const [, setDob] = useLocalStorageState('dob')

  const updateProfile = async ({ dob }) => setDob(dob)

  const onSubmit = async (data) => {
    await updateProfile(data)
    navigate('/address')
  }

  return (
    <>
      <Helmet>
        <title>{'Birthday | Root Insurance'}</title>
      </Helmet>
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h2 className="text-3xl">When’s your birthday?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 relative">
          <Input {...register('dob', { required: true })} placeholder="MM" />

          {formState.errors.dob?.type === 'required' && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              Date of birth is required
            </p>
          )}
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </>
  )
}
