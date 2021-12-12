export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form action="post">
        <label htmlFor="name">
          Name: <input type="text" name="name" />
        </label>
        <label htmlFor="content">
          Content: <textarea name="content" />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
