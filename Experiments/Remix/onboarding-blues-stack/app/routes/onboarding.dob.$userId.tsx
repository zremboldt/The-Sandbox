import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useActionData, useLoaderData } from "@remix-run/react";
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
  const dob = formData.get("dob");

  console.log(typeof dob);

  
  if (dob && typeof dob === "string") {
    const dobDateObj = new Date(dob);
    await updateUser(params.userId, "dob", dobDateObj);
    return redirect(`/onboarding/address/${params.userId}`);
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
      <p>When’s your birthday?</p>
      <div>
        <input
          type="date" 
          id="dob" 
          name="dob"
        ></input>
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
