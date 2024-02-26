import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";

import { createVehicle } from "~/models/vehicle.server";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const vin = formData.get("vin");

  if (typeof vin !== "string" || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
    return json(
      { errors: { vin: "Please enter a valid VIN" } },
      { status: 400 },
    );
  }

  await createRandomVehicle(params.userId, vin);

  return redirect(`/which-vehicles/${params.userId}`);
};

export default function AddVehicleDialog() {
  const actionData = useActionData<typeof action>();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
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

const createRandomVehicle = async (userId: string, vin: string) => {
  const randomNumber = Math.random();

  if (randomNumber < 0.2) {
    return createVehicle({
      year: 2024,
      make: "Honda",
      model: "Odyssey",
      vin,
      userId,
      includedOnPolicy: true,
    });
  } else if (randomNumber < 0.4) {
    return createVehicle({
      year: 2023,
      make: "Dodge",
      model: "Challenger",
      vin,
      userId,
      includedOnPolicy: true,
    });
  } else if (randomNumber < 0.6) {
    return createVehicle({
      year: 2021,
      make: "Honda",
      model: "Civic",
      vin,
      userId,
      includedOnPolicy: true,
    });
  } else if (randomNumber < 0.8) {
    return createVehicle({
      year: 2020,
      make: "Toyota",
      model: "Camry",
      vin,
      userId,
      includedOnPolicy: true,
    });
  } else {
    return createVehicle({
      year: 2022,
      make: "Toyota",
      model: "Highlander",
      vin,
      userId,
      includedOnPolicy: true,
    });
  }
};
