import { Button, Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";

import { updateUser } from "~/models/user.server";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const homeowner = formData.get("homeowner");

  console.log(homeowner)
  console.log(typeof homeowner)

  if (!homeowner) {
    return json(
      { errors: { homeowner: "Selection is required" } },
      { status: 400 },
    );
  }

  const isHomeowner = homeowner === "true" ? true : false;

  await updateUser(params.userId, "homeowner", isHomeowner);

  return redirect(`/onboarding/recently-moved/${params.userId}`);
};

export default function HomeownerScene() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <Flex direction="column" gap="3">
      <Heading size='8'>Do you rent or own your home?</Heading>

      <RadioGroup.Root name="homeowner">
        <Flex gap="2" direction="column">
          <Text as="label" size="4">
            <Flex gap="2">
              <RadioGroup.Item value="false" /> Rent
            </Flex>
          </Text>
          <Text as="label" size="4">
            <Flex gap="2">
              <RadioGroup.Item value="true" /> Own
            </Flex>
          </Text>
        </Flex>
      </RadioGroup.Root>

      <div>
        {/* <label htmlFor="rent-option">
          <input type="radio" name="homeowner" value="false" />
          Rent
        </label>
        <label htmlFor="own-option">
          <input type="radio" name="homeowner" value="true" />
          Own
        </label> */}
        {actionData?.errors?.homeowner ? (
          <div>{actionData.errors.homeowner}</div>
        ) : null}
      </div>

      {/* <div>
        <input
          ref={addressRef}
          name="address"
          placeholder="Address, city, state, ZIP"
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={actionData?.errors?.address ? true : undefined}
          aria-errormessage={
            actionData?.errors?.address ? "address-error" : undefined
          }
        />
        {actionData?.errors?.address ? (
          <div className="pt-1 text-red-700" id="address-error">
            {actionData.errors.address}
          </div>
        ) : null}
      </div> */}

        <Button type="submit" size='3'>
          Continue
        </Button>
        </Flex>
    </Form>
  );
}
