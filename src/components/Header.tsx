import Image from "next/image";

import Logo from "../assets/logo.svg";
import { HeaderContainer } from "../styles/components/header";

export function Header() {
  return (
    <HeaderContainer>
      <Image alt="" src={Logo} />
    </HeaderContainer>
  )
}
