import { InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { FunctionComponent, useState } from "react";
import invariant from "tiny-invariant";

import {
  createVehicle,
  getVehicleListItems,
  updateVehicle,
} from "~/models/vehicle.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");
  const vehicles = await getVehicleListItems({ userId: params.userId });

  return json({ vehicles, userId: params.userId });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();

  const _action = formData.get("_action");

  if (_action === "ADD_VEHICLE") {
    return handleAddVehicle({ formData, userId: params.userId });
  }
  if (_action === "TOGGLE_VEHICLE_INCLUDED") {
    return handleToggleVehicleIncluded({ formData });
  }

  async function handleToggleVehicleIncluded({
    formData,
  }: {
    formData: FormData;
  }) {
    const vehicleId = formData.get("vehicleId");
    const includedOnPolicy = formData.get("includedOnPolicy") === "true";

    if (typeof vehicleId !== "string") {
      return json(
        { errors: { vehicleId: "Vehicle ID is required" } },
        { status: 400 },
      );
    }

    return updateVehicle(vehicleId, "includedOnPolicy", includedOnPolicy);
  }

  async function handleAddVehicle({
    formData,
    userId,
  }: {
    formData: FormData;
    userId: string;
  }) {
    const vin = formData.get("vin");
    if (!vin || typeof vin !== "string") {
      return json(
        { errors: { vin: "Please enter a valid VIN" } },
        { status: 400 },
      );
    }

    return createRandomVehicle(userId, vin);
  }
};

export default function MaritalStatusScene() {
  const { vehicles, userId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="7">
      <Flex direction="column" gap="3">
        <Heading size="7">Which vehicles do you want to insure?</Heading>
        <Text color="gray">
          Need to add another vehicle? No worries, you can add more later.
        </Text>
      </Flex>

      <Flex direction="column" gap="3">
        {vehicles.length
          ? vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          : null}

        <AddVehicleDialog />

        <Button onClick={() => navigate(`/which-drivers/${userId}`)} size="3">
          Continue
        </Button>
      </Flex>

      <Callout.Root mt="8" color="gray">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          We pulled this information from public records. If there’s information
          that you don’t recognize, you can ignore it–it won’t affect your
          account.
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}

const VehicleCard: FunctionComponent<{
  vehicle: {
    id: string;
    year: number;
    make: string;
    model: string;
    includedOnPolicy: boolean;
  };
}> = ({ vehicle }) => {
  const fetcher = useFetcher();

  const includedOnPolicy = fetcher.formData
    ? fetcher.formData.get("includedOnPolicy") === "true"
    : vehicle.includedOnPolicy;

  const [isChecked, setIsChecked] = useState(includedOnPolicy);

  return (
    <Text key={vehicle.id} as="label">
      <Card size="2">
        <Flex gap="4" align="center" justify="between">
          <Box>
            <Text as="div" weight="bold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Text>
            <Text as="div" color="gray">
              {includedOnPolicy ? "Added" : "Not added"}
            </Text>
          </Box>
          <fetcher.Form method="post">
            <input
              type="hidden"
              name="_action"
              value="TOGGLE_VEHICLE_INCLUDED"
            />
            <input type="hidden" name="vehicleId" value={vehicle.id} />
            <Switch
              type="submit"
              name="includedOnPolicy"
              value={includedOnPolicy ? "false" : "true"}
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              radius="full"
              size="3"
            />
          </fetcher.Form>
        </Flex>
      </Card>
    </Text>
  );
};

const AddVehicleDialog = () => {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  const fetcherSuccess = fetcher.formData?.get("vin");
  if (fetcherSuccess && open) {
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="2" variant="outline">
          <PlusCircledIcon width="16" height="16" /> Add vehicle
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>What’s the VIN?</Dialog.Title>

        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="ADD_VEHICLE" />
          <Flex direction="column" gap="3">
            <TextField.Input size="3" name="vin" placeholder="VIN" />

            {fetcher.data?.errors?.vin ? (
              <Text size="1" color="red" trim="start">
                {fetcher.data?.errors.vin}
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
        </fetcher.Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

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
