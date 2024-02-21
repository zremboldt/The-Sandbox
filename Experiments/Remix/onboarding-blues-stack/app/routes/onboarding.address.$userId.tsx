import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";

import { updateUser } from "~/models/user.server";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const address = formData.get("address");

  if (typeof address !== "string" || address.length === 0) {
    return json(
      { errors: { address: "Address is required" } },
      { status: 400 },
    );
  }

  await updateUser(params.userId, "address", address);

  // IDEA: Have a fn that looks at what values are missing in the User object and just redirects to the next step. 
  // The end of every action in onboarding would call this. I don't know that we even need xState.
  return redirect(`/onboarding/homeowner/${params.userId}`);
};

export default function AddressScene() {
  const actionData = useActionData<typeof action>();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Form method="post">
      <Flex direction="column" gap="5">
        <Heading size='7'>What’s your home address?</Heading>

        <Flex direction="column" gap="3">
          <TextField.Input
            size='3'
            ref={addressRef}
            name="address"
            placeholder="Address, city, state, ZIP"
            aria-invalid={actionData?.errors?.address ? true : undefined}
            aria-errormessage={actionData?.errors?.address ? "address-error" : undefined}
          />

          {actionData?.errors?.address ? (
            <Text size='1' color='red' trim='start'>{actionData.errors.address}</Text>
          ) : null}

          <Button type="submit" size='3'>Continue</Button>
        </Flex>
      </Flex>
    </Form>
  );
}
