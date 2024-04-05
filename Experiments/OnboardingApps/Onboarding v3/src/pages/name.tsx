import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import { Input } from 'src/components/ui/input'
import { useProfileStore } from 'src/hooks/profile-store'

export default function NameScene() {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm()
  const updateFirstName = useProfileStore((state) => state.updateFirstName)
  const updateLastName = useProfileStore((state) => state.updateLastName)

  // const { register, formState, handleSubmit } = useForm<Schema>({
  //   resolver: zodResolver(schema),
  // })

  const onSubmit = ({ firstName, lastName }) => {
    updateFirstName(firstName)
    updateLastName(lastName)
    navigate('/dob')
  }

  return (
    <>
      <Helmet>
        <title>{'Name | Root Insurance'}</title>
      </Helmet>
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h1 className="text-4xl lg:text-5xl">Get a quote in less than 5 minutes</h1>

        <div className="w-16 h-1 bg-primary"></div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">Let’s start with your name</h2>
          <p>Please make sure it matches the information on your license.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input {...register('firstName', { required: true, maxLength: 64 })} placeholder="First name" />

          {formState.errors.firstName?.type === 'required' && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              First name is required
            </p>
          )}

          <Input {...register('lastName', { required: true, maxLength: 64 })} placeholder="Last name" />

          {formState.errors.lastName?.type === 'required' && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              Last name is required
            </p>
          )}

          <Button type="submit">Continue</Button>
        </form>

        <p className="text-center">
          Been here before?{' '}
          <Link
            to="/sign-in"
            className="no-underline outline-none text-foreground transition hover:text-primary focus-visible:text-primary"
          >
            Finish signing up
          </Link>
        </p>
      </div>
    </>
  )
}
