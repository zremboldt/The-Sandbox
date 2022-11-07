import Link from "next/link";

export default function Nav({ isMenuVisible, setIsMenuVisible }) {
  // return null
  return (
    <nav>
      <h2 className={"logo"}>✨ Word</h2>
      <button onClick={() => setIsMenuVisible(!isMenuVisible)}>MENU</button>
    </nav>
  );
}
