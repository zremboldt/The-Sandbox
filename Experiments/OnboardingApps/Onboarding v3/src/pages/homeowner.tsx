import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { useProfileStore } from 'src/hooks/profile-store'

export default function AddressScene() {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm()
  const firstName = useProfileStore((state) => state.firstName)
  const lastName = useProfileStore((state) => state.lastName)
  const dob = useProfileStore((state) => state.dob)
  const address = useProfileStore((state) => state.address)

  // const onSubmit = ({ address }) => {
  //   setAddress(address)
  //   navigate('/homeowner')
  // }

  return (
    <>
      <Helmet>
        <title>{'Address | Root Insurance'}</title>
      </Helmet>
      <div className="flex flex-col gap-8 w-full max-w-md">
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{dob}</p>
        <p>{address}</p>

        {/* <h2 className="text-3xl">What’s your home address?</h2> */}
        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 relative">
          <Input {...register('address', { required: true })} placeholder="MM" />

          {formState.errors.address?.type === 'required' && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              Date of birth is required
            </p>
          )}
          <Button type="submit">Continue</Button>
        </form> */}
      </div>
    </>
  )
}
