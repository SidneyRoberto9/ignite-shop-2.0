import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { SideNavControllerProvider } from "../context/SideNavControllerContext";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";

import type { AppProps } from 'next/app'
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider>
      <SideNavControllerProvider>
        <Container>
          <SideNav />
          <Header />
          <Component {...pageProps} />
        </Container>
      </SideNavControllerProvider>
    </ShoppingCartProvider>
  )
}
