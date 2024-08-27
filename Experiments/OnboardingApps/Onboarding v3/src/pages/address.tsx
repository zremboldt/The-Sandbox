import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from 'src/components/ui/input'
import { useProfileStore } from 'src/hooks/profile-store'

const formSchema = z.object({
  address: z.string().min(1, {
    message: 'Address is required',
  }),
})

export default function AddressScene() {
  const navigate = useNavigate()
  const updateAddress = useProfileStore((state) => state.updateAddress)
  const { register, formState, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  })

  const onSubmit = ({ address }: z.infer<typeof formSchema>) => {
    updateAddress(address)
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
          <Input autoFocus {...register('address', { required: true })} placeholder="Address, city, state, ZIP" />

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
