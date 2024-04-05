import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import { Input } from 'src/components/ui/input'
import { useProfileStore } from 'src/hooks/profile-store'

export default function DobScene() {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm()
  const updateDob = useProfileStore((state) => state.updateDob)

  const onSubmit = ({ dob }) => {
    updateDob(dob)
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
