import { Cross as MenuIcon } from "hamburger-react";

export default function Nav({ isMenuVisible, setIsMenuVisible }) {
  // return null
  return (
    <nav>
      <h2 className={"logo"}>✨ Word</h2>

      <MenuIcon
        toggled={isMenuVisible}
        toggle={() => setIsMenuVisible(!isMenuVisible)}
        size={28}
      />
    </nav>
  );
}
