// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

// import { getNoteListItems } from "~/models/note.server";
// import { requireUserId } from "~/session.server";
// import { useUser } from "~/utils";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await requireUserId(request);
//   const noteListItems = await getNoteListItems({ userId });
//   return json({ noteListItems });
// };

export default function NotesPage() {
  // const data = useLoaderData<typeof loader>();
  // const user = useUser();

  return (
    <div>
      <header>
        <h1>
          <Link to=".">Root</Link>
        </h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
