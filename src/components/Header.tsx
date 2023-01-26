import Image from 'next/image'
import { useRouter } from 'next/router'
import { Bag } from 'phosphor-react'
import { useState } from 'react'

import Logo from '../assets/logo.svg'
import {
  HeaderContainer,
  Icon,
  NotificationItems,
} from '../styles/components/header'

interface HeaderProps {
  handleOpenSideNav: () => void
}

export function Header({ handleOpenSideNav }: HeaderProps) {
  const [cartItems, setCartItems] = useState<number>(1)

  const { push } = useRouter()

  function navigateToHome() {
    push('/')
  }

  return (
    <HeaderContainer>
      <Image alt="" src={Logo} onClick={navigateToHome} />

      <Icon
        onClick={handleOpenSideNav}
        color={cartItems > 0 ? 'white' : 'gray'}
      >
        <Bag size={24} />
        {cartItems > 0 && <NotificationItems>{cartItems}</NotificationItems>}
      </Icon>
    </HeaderContainer>
  )
}
