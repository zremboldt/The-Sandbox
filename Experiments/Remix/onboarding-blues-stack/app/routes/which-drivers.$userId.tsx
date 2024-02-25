import { InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Switch,
  Text,
} from "@radix-ui/themes";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { FunctionComponent, useState } from "react";
import invariant from "tiny-invariant";

import { getVehicleListItems, updateVehicle } from "~/models/vehicle.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");
  const vehicles = await getVehicleListItems({ userId: params.userId });
  if (!vehicles.length) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ vehicles });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();

  const vehicleId = formData.get("vehicleId");
  const includedOnPolicy = formData.get("includedOnPolicy") === "true";

  if (typeof vehicleId !== "string") {
    return json(
      { errors: { vehicleId: "Vehicle ID is required" } },
      { status: 400 },
    );
  }

  return updateVehicle(vehicleId, "includedOnPolicy", includedOnPolicy);
};

export default function MaritalStatusScene() {
  const { vehicles } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="7">
      <Flex direction="column" gap="3">
        <Heading size="7">
          Which drivers will be covered on your policy?
        </Heading>

        <Card size="2">
          <Flex gap="4" align="center">
            <Avatar size="5" radius="full" fallback="T" color="tomato" />
            <Flex direction="column" gap="2">
              <Text as="div" size="1" weight="bold" color="tomato">
                ROOT SAVINGS TIP
              </Text>
              <Text as="div" size="3" weight="bold">
                To maximize your savings, everyone on your policy must take the
                test drive.
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Text color="gray">
          All household members with a valid driver’s license, and other regular
          operators of the insured vehicle(s), must be listed on your policy.
        </Text>
        <Text color="gray">
          Household members with a valid driver’s license will only be covered
          if they are listed.
        </Text>
      </Flex>

      <Flex direction="column" gap="3">
        {vehicles.length
          ? vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          : null}

        <Button type="submit" size="2" variant="outline">
          <PlusCircledIcon width="16" height="16" /> Add driver
        </Button>

        <Button type="submit" size="3">
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
