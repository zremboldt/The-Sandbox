import { InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Callout, Card, Flex, Heading, RadioGroup, Separator, Switch, Text } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { updateUser } from "~/models/user.server";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const maritalStatus = formData.get("marital-status");

  if (typeof maritalStatus !== "string") {
    return json(
      { errors: { maritalStatus: "Selection is required" } },
      { status: 400 },
    );
  }

  await updateUser(params.userId, "maritalStatus", maritalStatus);

  // return null;
  return redirect(`/which-vehicles/${params.userId}`);
};

export default function MaritalStatusScene() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <Flex direction="column" gap="5">
        <Heading size='7'>Which vehicles do you want to insure?</Heading>
        <Text>Need to add another vehicle? No worries, you can add more later.</Text>

        <Flex direction="column" gap="3">
          <Card size="2">
            <Flex gap="4" align="center" justify='between'>
              {/* <Avatar size="4" radius="full" fallback="T" color="indigo" /> */}
              <Box>
                <Text as="div" weight="bold">
                  2014 Toyota Corolla
                </Text>
                <Text as="div" color="gray">
                  Add
                </Text>
              </Box>
              <Switch radius="full" size="3" defaultChecked />
            </Flex>
          </Card>

          <Card size="2">
            <Flex gap="4" align="center" justify='between'>
              {/* <Avatar size="4" radius="full" fallback="T" color="indigo" /> */}
              <Box>
                <Text as="div" weight="bold">
                  2020 Dodge Grand Caravan
                </Text>
                <Text as="div" color="gray">
                  Add
                </Text>
              </Box>
              <Switch radius="full" size="3" defaultChecked />
            </Flex>
          </Card>
        </Flex>

        {/* {actionData?.errors?.maritalStatus ? (
          <Text size='1' color='red' trim='start'>{actionData.errors.maritalStatus}</Text>
        ) : null} */}

        <Flex direction="column" gap="3">
          <Button type="submit" size='3' variant="outline">
            <PlusCircledIcon width="16" height="16" /> Add vehicle
          </Button>

          <Button type="submit" size='3'>Continue</Button>
        </Flex>

        <Callout.Root mt='6' color="blue" variant="surface">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>We pulled this information from public records. If there’s information that you don’t recognize, you can ignore it–it won’t affect your account.</Callout.Text>
        </Callout.Root>
      </Flex>
    </Form>
  );
}
