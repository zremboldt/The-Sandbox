import { Box, Button, Flex, Heading, RadioGroup, Separator, Text } from "@radix-ui/themes";
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
      <Flex direction="column" gap="5">
        <Heading size='7'>Do you rent or own your home?</Heading>

        <RadioGroup.Root name="homeowner">
          <Separator size="4" />
            <Text as="label" size="4">
              <Box px='4' py='4'>
                <Flex justify='between'>
                  Rent <RadioGroup.Item value="false" />
                </Flex>
              </Box>
            </Text>
          <Separator size="4" />
            <Text as="label" size="4">
              <Box px='4' py='4'>
                <Flex justify='between'>
                  Own <RadioGroup.Item value="true" />
                </Flex>
              </Box>
            </Text>
          <Separator size="4" />
        </RadioGroup.Root>

        {actionData?.errors?.homeowner ? (
          <Text size='1' color='red' trim='start'>{actionData.errors.homeowner}</Text>
        ) : null}

        <Button type="submit" size='3'>Continue</Button>
      </Flex>
    </Form>
  );
}
