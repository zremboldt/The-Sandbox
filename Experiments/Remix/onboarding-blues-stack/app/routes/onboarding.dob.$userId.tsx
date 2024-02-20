import { Button, Container, Flex, Heading, TextField } from "@radix-ui/themes";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";

import { getUserById, updateUser } from "~/models/user.server";


// Not necessary but I'll keep it as an example
export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");
  const user = await getUserById(params.userId);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  // const month = formData.get("month");
  // const day = formData.get("day");
  // const year = formData.get("year");
  const dob = formData.get("dob");

  // console.log(typeof dob);

  // if (typeof month !== 'string') {
  //   return json(
  //     { errors: { month: "First name is required", lastName: null } },
  //     { status: 400 },
  //   );
  // }
  
  if (dob && typeof dob === "string") {
    const dobDateObj = new Date(dob);
    await updateUser(params.userId, "dob", dobDateObj);
    return redirect(`/onboarding/address/${params.userId}`);
  }
};

export default function DobScene() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  return (
    <Form method="post">
      <Flex direction="column" gap="3">
        <h2>Hi {user.firstName} 👋</h2>
        <Heading size='8'>When’s your birthday?</Heading>
          <input
            type="date" 
            id="dob" 
            name="dob"
          ></input>

          <Flex direction="row" gap="3">
            <TextField.Input
              size='3'
              ref={monthRef}
              name="month"
              placeholder="MM"
              maxLength={2}
              // aria-invalid={actionData?.errors?.month ? true : undefined}
              // aria-errormessage={
              //   actionData?.errors?.month ? "month-error" : undefined
              // }
            />

            <TextField.Input
              size='3'
              ref={dayRef}
              name="day"
              placeholder="DD"
              maxLength={2}
              // aria-invalid={actionData?.errors?.day ? true : undefined}
              // aria-errormessage={
              //   actionData?.errors?.day ? "day-error" : undefined
              // }
            />

            <TextField.Input
              size='3'
              ref={yearRef}
              name="year"
              placeholder="YYYY"
              maxLength={4}
              // aria-invalid={actionData?.errors?.year ? true : undefined}
              // aria-errormessage={
              //   actionData?.errors?.year ? "year-error" : undefined
              // }
            />
          </Flex>

    
        <Button type="submit" size='3'>
          Continue
        </Button>
      </Flex>
    </Form>
  );
}
