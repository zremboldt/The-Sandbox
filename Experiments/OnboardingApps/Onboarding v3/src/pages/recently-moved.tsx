import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from 'src/components/ui/input'
import { useProfileStore } from 'src/hooks/profile-store'
import { Separator } from 'src/components/ui/separator'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import { Label } from 'src/components/ui/label'

const formSchema = z.object({
  homeowner: z.boolean().nullable(),
})

export default function RecentlyMovedScene() {
  const navigate = useNavigate()
  const homeowner = useProfileStore((state) => state.homeowner)
  const updateHomeowner = useProfileStore((state) => state.updateHomeowner)
  const { register, formState, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeowner: null,
    },
  })

  const onSubmit = ({ homeowner }: z.infer<typeof formSchema>) => {
    updateHomeowner(homeowner)
    navigate('/recently-moved')
  }

  console.log('homeowner: ', homeowner)

  return (
    <>
      <Helmet>
        <title>{'Recently moved | Root Insurance'}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-md">
        <h2 className="text-3xl">Have you moved in the last 6 months?</h2>

        {homeowner}

        <RadioGroup {...register('homeowner', { required: true })}>
          <Separator />
          <Label className="flex items-center justify-between py-5 px-3">
            Rent
            <RadioGroupItem value="false" />
          </Label>
          <Separator />
          <Label className="flex items-center justify-between py-5 px-3">
            Own
            <RadioGroupItem value="true" />
          </Label>
          <Separator />

          {formState.errors.homeowner?.type === 'required' && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              Date of birth is required
            </p>
          )}
        </RadioGroup>

        <Button type="submit">Continue</Button>
      </form>
    </>
  )
}
