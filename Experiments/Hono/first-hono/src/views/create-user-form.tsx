import { css } from "hono/css";

export const CreateUserForm = () => {
  return (
    <div class="card">
      <form
        action="/users"
        method="post"
        class={css`
          display: flex;
          flex-direction: column;
          gap: 2rem;
        `}
      >
        <div
          class={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          `}
        >
          <h2 style="margin-bottom: 0.5rem">Create user</h2>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            autocomplete="off"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autocomplete="off"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
