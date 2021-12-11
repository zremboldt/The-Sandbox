import { useEffect, useState } from "react";
import { MetaFunction, LoaderFunction, Form } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);
  const searchParam = url.search ? url.searchParams.get('search') : '';
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchParam}`);

  try {
    const data = await result?.json();
    return data;
  } catch (err) {
    console.log(`ERROR! 😢 HERE IT IS: ${err}`)
    return null;
  }
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const [posX, setPosX] = useState(0);
  let data = useLoaderData<IndexData>();

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        setPosX(posX => posX + 20);
      }
      if (e.key === 'ArrowLeft') {
        setPosX(posX => posX - 20);
      }
    })
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--img-pos-x',
      `${posX}px`
    );
  }, [posX])

  return (
    <>
      <Form method="get" action="/">
        <input name="search" type="number" autoComplete="off" min='1' max='898' />
        <button type="submit">submit</button>
      </Form>
      <Result data={data} />
    </>
  );
}

function Result({ data }) {
  if (data.results) return null;

  return (
    <div className="results">
      <img src={data?.sprites?.front_default} />
      <h5>{data?.name}</h5>
    </div>
  )
}