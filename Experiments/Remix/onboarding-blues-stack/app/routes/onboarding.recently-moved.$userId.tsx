import { Button, Heading } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";

import { updateUser } from "~/models/user.server";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  // const homeowner = formData.get("homeowner");

  // if (typeof homeowner !== "string" || homeowner.length === 0) {
  //   return json(
  //     { errors: { homeowner: "Selection is required" } },
  //     { status: 400 },
  //   );
  // }

  // await updateUser(params.userId, "homeowner", homeowner);

  // return redirect(`/onboarding/recently-moved/${params.userId}`);
};

export default function HomeownerScene() {
  // const actionData = useActionData<typeof action>();
  // const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Form method="post">
      <Heading size='8'>Have you moved in the last 6 months?</Heading>
      {/* <div>
        <label htmlFor="rent-option">
          <input type="radio" name="homeowner" value="rent" />
          Rent
        </label>
        <label htmlFor="own-option">
          <input type="radio" name="homeowner" value="own" />
          Own
        </label>
      </div> */}
      
      
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
    </Form>
  );
}
