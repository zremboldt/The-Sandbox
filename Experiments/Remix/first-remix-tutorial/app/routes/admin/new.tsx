import { redirect, Form, useActionData, useTransition } from 'remix'
import type { ActionFunction } from 'remix'
import { createPost } from '~/post'
import invariant from "tiny-invariant";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  await new Promise(res => setTimeout(res, 1000));
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect('/admin')
}

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method='post'>
      <p>
        <label>
          Post title:{" "}
          {errors?.title && <em>Title is required</em>}
          <input type="text" name='title' />
        </label>
      </p>
      <p>
        <label>
          Post slug:{" "}
          {errors?.slug && <em>Slug is required</em>}
          <input type="text" name='slug' />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea name="markdown" rows={20}></textarea>
      </p>
      <p>
        <button type='submit'>
          {transition.submission ? 'Creating...' : 'Create post'}
        </button>
      </p>
    </Form>
  )
}