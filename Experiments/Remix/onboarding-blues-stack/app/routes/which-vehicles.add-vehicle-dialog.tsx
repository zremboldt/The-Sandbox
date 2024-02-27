import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useState } from "react";

import { requireUser } from "~/session.server";
import { createRandomVehicle } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accountId } = await requireUser(request);
  const formData = await request.formData();
  const vin = formData.get("vin");

  if (typeof vin !== "string" || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
    return json(
      { errors: { vin: "Please enter a valid VIN" } },
      { status: 400 },
    );
  }

  await createRandomVehicle({ accountId, vin });

  return redirect(`/which-vehicles`);
};

export default function AddVehicleDialog() {
  const actionData = useActionData<typeof action>();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 200); // allow time for the dialog to animate before navigating
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>What’s the VIN?</Dialog.Title>

        <Form method="post">
          <Flex direction="column" gap="3">
            <TextField.Input
              size="3"
              name="vin"
              placeholder="VIN"
              onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            />

            {actionData?.errors?.vin ? (
              <Text size="1" color="red" trim="start">
                {actionData.errors.vin}
              </Text>
            ) : null}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Add vehicle</Button>
          </Flex>
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
