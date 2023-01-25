import Image from "next/image";
import { useRouter } from "next/router";
import { Bag } from "phosphor-react";
import { useState } from "react";

import Logo from "../assets/logo.svg";
import { HeaderContainer, IconGray, IconWhite, NotificationItems } from "../styles/components/header";

export function Header() {
  const [cartItems, setCartItems] = useState<number>(1)

  const { push } = useRouter()

  function navigateToHome() {
    push('/')
  }

  return (
    <HeaderContainer>
      <Image alt="" src={Logo} onClick={navigateToHome} />

      {cartItems > 0 ? (
        <IconWhite>
          <Bag size={24} />
          {cartItems > 0 && <NotificationItems>{cartItems}</NotificationItems>}
        </IconWhite>
      ) : (
        <IconGray>
          <Bag size={24} />
        </IconGray>
      )}
    </HeaderContainer>
  )
}
