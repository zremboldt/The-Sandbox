import { useEffect, useState } from "react";
import { MetaFunction, LoaderFunction, Form } from "remix";
import { useLoaderData, json, Link } from "remix";
import stars from './../stars.gif'

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

  const pokemon = `https://pokeapi.co/api/v2/pokemon/${searchParam}`;
  const berry = `https://pokeapi.co/api/v2/item/129/`;
  const urls = [pokemon, berry];

  try {
    const response = await Promise.all(
      urls.map(url => fetch(url)
        .then(res => res.json())
        .then(json => json)
      )
    );
    return response;
  } catch (err) {
    console.log(`ERROR! 😢 HERE IT IS: ${err}`)
    return null;
  }
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  let data = useLoaderData<IndexData>();

  useEffect(() => {
    document.querySelector('body').style.setProperty(
      'background-image',
      `url(${stars})`
    )

    window.addEventListener('keydown', (e) => {
      console.log(e.key)
      if (e.key === 'd') {
        setPosX(posX => posX + 20);
      }
      if (e.key === 'a') {
        setPosX(posX => posX - 20);
      }
      if (e.key === 'w') {
        setPosY(posY => posY - 20);
      }
      if (e.key === 's') {
        setPosY(posY => posY + 20);
      }
    })
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--img-pos-x',
      `${posX}px`
    );
    document.documentElement.style.setProperty(
      '--img-pos-y',
      `${posY}px`
    );
  }, [posX, posY])

  return (
    <>
      <Result data={data} />
      <Form method="get" action="/">
        <input name="search" type="number" autoComplete="off" min='1' max='898' />
        <button type="submit">Get pokie</button>
      </Form>
    </>
  );
}

function Result({ data }) {
  return (
    <>
      {data.map((item, i) => {
        if (item.sprites?.front_default) {
          return (
            <div key={i} className="results">
              <img className="pokemon" src={item.sprites?.front_default} />
              <h3>{`#${item.id}: ${item.name}`}</h3>
            </div>
          )
        } else return (
          null
          // <img key={i} className="berry" src={item.sprites?.default} />
        )
      })}
    </>
  )
}