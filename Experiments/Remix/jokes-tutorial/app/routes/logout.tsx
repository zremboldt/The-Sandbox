import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { logout } from "~/utils/session.server";

export const action: ActionFunction = ({ request }) => logout(request);

// This loader is here just in case someone tries to access this route directly.
export const loader: LoaderFunction = () => redirect("/");