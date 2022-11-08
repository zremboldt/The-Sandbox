import { Cross as MenuIcon } from "hamburger-react";
import Image from "next/image";
import Logo from "../assets/logo.png";

export default function Nav({ isMenuVisible, setIsMenuVisible }) {
  // return null
  return (
    <nav>
      <Image src={Logo} alt="" width={140} />
      {/* <h2 className={"logo"}>✨ Word</h2> */}
      {/* <img src={Logo} alt="" /> */}

      <MenuIcon
        toggled={isMenuVisible}
        toggle={() => setIsMenuVisible(!isMenuVisible)}
        size={28}
      />
    </nav>
  );
}
