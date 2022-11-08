import { Cross as MenuIcon } from "hamburger-react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { useState } from "react";
import Menu from "./menu";

export default function Nav({ setSelectedVerse, data }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  return (
    <>
      <nav>
        <Image src={Logo} alt="" width={140} />

        <MenuIcon
          toggled={isMenuVisible}
          toggle={() => setIsMenuVisible(!isMenuVisible)}
          size={28}
        />
      </nav>

      <Menu
        setSelectedVerse={setSelectedVerse}
        data={data}
        setIsMenuVisible={setIsMenuVisible}
        isMenuVisible={isMenuVisible}
      />
    </>
  );
}
