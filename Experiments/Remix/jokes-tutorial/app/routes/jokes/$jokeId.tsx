import { Joke } from "@prisma/client";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null }

export const loader: LoaderFunction = async ({ params }) => {
  const data: LoaderData = {
    joke: await db.joke.findUnique({
      select: { content: true },
      where: { id: params.jokeId }
    })
  }
  return data;
}

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  console.log(data)

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
    </div>
  );
}