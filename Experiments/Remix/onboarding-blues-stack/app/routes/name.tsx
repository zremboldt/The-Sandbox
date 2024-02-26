import {
  Flex,
  Text,
  Button,
  TextField,
  Heading,
  Separator,
} from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createCookie, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/dob");
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
      { errors: { firstName: null, lastName: "Last name is required" } },
      { status: 400 },
    );
  }

  const user = await createUser(firstName, lastName);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
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
      <Flex direction="column" gap="5">
        <Flex direction="column" gap="3">
          <Heading size="8">Get a quote in less than 5 minutes</Heading>
          <Separator
            orientation="horizontal"
            size="3"
            my="3"
            style={{ height: 3 }}
          />
          <Heading size="7">Let’s start with your name</Heading>
          <Text color="gray">
            Please make sure it matches the information on your license.
          </Text>
        </Flex>

        <Flex direction="column" gap="3">
          <TextField.Input
            autoFocus
            size="3"
            ref={firstNameRef}
            name="firstName"
            placeholder="First name"
            aria-invalid={actionData?.errors?.firstName ? true : undefined}
            aria-errormessage={
              actionData?.errors?.firstName ? "firstName-error" : undefined
            }
          />

          {actionData?.errors?.firstName ? (
            <Text size="1" color="red" trim="start">
              {actionData.errors.firstName}
            </Text>
          ) : null}

          <TextField.Input
            size="3"
            ref={lastNameRef}
            name="lastName"
            placeholder="Last name"
            aria-invalid={actionData?.errors?.lastName ? true : undefined}
            aria-errormessage={
              actionData?.errors?.lastName ? "lastName-error" : undefined
            }
          />

          {actionData?.errors?.lastName ? (
            <Text size="1" color="red" trim="start">
              {actionData.errors.lastName}
            </Text>
          ) : null}

          <Button type="submit" size="3">
            Continue
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
