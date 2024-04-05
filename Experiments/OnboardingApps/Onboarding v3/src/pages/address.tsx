import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import useLocalStorageState from 'src/hooks/use-localstorage-state'
import { Input } from 'src/components/ui/input'

export default function AddressScene() {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm()
  const [, setAddress] = useLocalStorageState('address')

  const updateProfile = async ({ address }) => setAddress(address)

  const onSubmit = async (data) => {
    await updateProfile(data)
    navigate('/homeowner')
  }

  return (
    <>
      <Helmet>
        <title>{'Address | Root Insurance'}</title>
      </Helmet>
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h2 className="text-3xl">What’s your home address?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 relative">
          <Input {...register('address', { required: true })} placeholder="Address, city, state, ZIP" />

          {formState.errors.address?.type === 'required' && (
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
