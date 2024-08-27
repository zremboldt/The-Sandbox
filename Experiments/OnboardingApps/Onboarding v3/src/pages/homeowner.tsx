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
  homeowner: z.string(),
})

export default function HomeownerScene() {
  const navigate = useNavigate()
  const updateHomeowner = useProfileStore((state) => state.updateHomeowner)
  const { register, formState, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    // defaultValues: {
    //   homeowner: '',
    // },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    updateHomeowner(homeowner)
    // navigate('/recently-moved')
  }

  return (
    <>
      <Helmet>
        <title>{'Homeowner | Root Insurance'}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-md">
        <h2 className="text-3xl">Do you rent or own your home?</h2>

        <RadioGroup>
          <Separator />
          <Label className="flex items-center justify-between py-5 px-3">
            Rent
            <RadioGroupItem {...register('homeowner')} value="rent" />
          </Label>
          <Separator />
          <Label className="flex items-center justify-between py-5 px-3">
            Own
            <RadioGroupItem {...register('homeowner')} value="own" />
          </Label>
          <Separator />

          {formState.errors.homeowner?.message && (
            <p role="alert" className="text-destructive text-sm -mt-2">
              {formState.errors.homeowner.message}
            </p>
          )}
        </RadioGroup>

        <Button type="submit">Continue</Button>
      </form>
    </>
  )
}
