import Image from "next/image";
import { useRouter } from "next/router";
import { Bag } from "phosphor-react";
import { useContext, useState } from "react";

import Logo from "../assets/logo.svg";
import { ShoppingCart } from "../context/ShoppingCartContext";
import { SideNavController } from "../context/SideNavControllerContext";
import { HeaderContainer, Icon, NotificationItems } from "../styles/components/header";

export function Header() {
  const { toggleSideNav } = useContext(SideNavController)
  const { productSize } = useContext(ShoppingCart)

  const { push } = useRouter()

  function handleOpenSideNav() {
    toggleSideNav(true)
  }

  function navigateToHome() {
    push('/')
  }

  return (
    <HeaderContainer>
      <Image alt="" src={Logo} onClick={navigateToHome} />

      <Icon
        onClick={handleOpenSideNav}
        color={productSize > 0 ? 'white' : 'gray'}
      >
        <Bag size={24} />
        {productSize > 0 && (
          <NotificationItems>{productSize}</NotificationItems>
        )}
      </Icon>
    </HeaderContainer>
  )
}
