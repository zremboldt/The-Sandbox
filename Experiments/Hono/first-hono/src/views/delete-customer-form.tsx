import { css } from "hono/css";

export const DeleteCustomerForm = () => {
  return (
    <div class="card">
      <form
        method="post"
        onsubmit="this.action = '/customers/' + this.id.value"
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
          <h2 style="margin-bottom: 0.5rem">Delete customer</h2>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Customer ID"
            autocomplete="off"
            required
          />
          {/* HTTP methods don't support DELETE in forms, so we use a hidden input to convey intent to the server */}
          <input type="hidden" name="_method" value="DELETE" />
        </div>
        <button type="submit" class="button-danger">
          Delete
        </button>
      </form>
    </div>
  );
};
