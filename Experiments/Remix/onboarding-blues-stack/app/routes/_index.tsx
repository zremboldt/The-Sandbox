import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Container, Flex, Heading, IconButton } from "@radix-ui/themes";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { RootLogo } from "~/components/root-logo";

import { useOptionalUser } from "~/utils";


// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";

// import { getNoteListItems } from "~/models/note.server";
// import { requireUserId } from "~/session.server";
// import { useUser } from "~/utils";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await requireUserId(request);
//   const noteListItems = await getNoteListItems({ userId });
//   return json({ noteListItems });
// };

export default function Index() {
  // const data = useLoaderData<typeof loader>();
  // const user = useUser();

  return null;
}
