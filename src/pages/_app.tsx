import { useState } from 'react'

import { Header } from '../components/Header'
import { SideNav } from '../components/SideNav'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

import type { AppProps } from 'next/app'
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenSideNav() {
    setIsOpen(true)
  }

  return (
    <Container>
      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header handleOpenSideNav={handleOpenSideNav} />
      <Component {...pageProps} id="page-wrap" />
    </Container>
  )
}
