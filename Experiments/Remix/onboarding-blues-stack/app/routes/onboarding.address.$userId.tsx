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

export default function DobScene() {
  const actionData = useActionData<typeof action>();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <h2>What’s your home address?</h2>
      <div>
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
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Continue
        </button>
      </div>
    </Form>
  );
}
