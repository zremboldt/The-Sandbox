import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUserById } from "~/models/user.server";


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
};

export default function DobScene() {
  const { user } = useLoaderData<typeof loader>();
  // const actionData = useActionData<typeof action>();

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
      <h2>Hi {user.firstName} 👋</h2>
      <p>Please enter your dob</p>
      <div>
        {/* <input
          ref={firstNameRef}
          name="firstName"
          placeholder="First name"
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={actionData?.errors?.firstName ? true : undefined}
          aria-errormessage={
            actionData?.errors?.firstName ? "firstName-error" : undefined
          }
        /> */}
        {/* <label for="dob">Date of Birth:</label> */}
        <input type="date" id="dob" name="dob"></input>
        {/* {actionData?.errors?.firstName ? (
          <div className="pt-1 text-red-700" id="firstName-error">
            {actionData.errors.firstName}
          </div>
        ) : null} */}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
