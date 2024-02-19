import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser } from "~/models/user.server";



export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  if (typeof firstName !== "string" || firstName.length === 0) {
    return json(
      { errors: { firstName: "First name is required", lastName: null } },
      { status: 400 },
    );
  }

  if (typeof lastName !== "string" || lastName.length === 0) {
    return json(
      { errors: { firstName: null, lastName: "First name is required",  } },
      { status: 400 },
    );
  }

  const user = await createUser( firstName, lastName );
  console.log(user);

  return redirect(`/onboarding/dob/${user.id}`);
};



export default function NameScene() {
  const actionData = useActionData<typeof action>();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus();
    } else if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post">
      <h2>Get a quote in less than 5 minutes</h2>
      <p>--</p>
      <h3>Let’s start with your name</h3>
      <p>Please make sure it matches the information on your license.</p>
      <div>
        <input
          ref={firstNameRef}
          name="firstName"
          placeholder="First name"
          aria-invalid={actionData?.errors?.firstName ? true : undefined}
          aria-errormessage={
            actionData?.errors?.firstName ? "firstName-error" : undefined
          }
        />
        {actionData?.errors?.firstName ? (
          <div>{actionData.errors.firstName}</div>
        ) : null}
      </div>

      <div>
        <input
          ref={lastNameRef}
          name="lastName"
          placeholder="Last name"
          
          aria-invalid={actionData?.errors?.lastName ? true : undefined}
          aria-errormessage={
            actionData?.errors?.lastName ? "lastName-error" : undefined
          }
        />
        {actionData?.errors?.lastName ? (
          <div>
            {actionData.errors.lastName}
          </div>
        ) : null}
      </div>

      <button type="submit">
        Continue
      </button>
    </Form>
  );
}
