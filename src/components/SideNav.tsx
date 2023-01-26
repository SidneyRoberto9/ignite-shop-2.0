import Image from 'next/image'
import { useState } from 'react'
import { slide as Menu, State } from 'react-burger-menu'

import svg from '../assets/test.svg'
import {
  Button,
  Content,
  Item,
  ItemsContainer,
  SideNavContainer,
} from '../styles/components/sidenav'

interface SideNavProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  function handleStateChange(state: State) {
    setIsOpen(state.isOpen)
  }

  return (
    <SideNavContainer>
      <Menu
        right
        isOpen={isOpen}
        width={'30rem'}
        customBurgerIcon={false}
        onStateChange={(state) => handleStateChange(state)}
        className="side-nav"
      >
        <div>
          <h1>Sacola de Compras</h1>

          <ItemsContainer>
            <Item>
              <ins>
                <Image src={svg} alt="" width={100} height={93} />
              </ins>

              <article>
                <small>
                  <p>Camiseta Beyond the Limits</p>
                  <strong>R$ 79,90</strong>
                </small>

                <span>remover</span>
              </article>
            </Item>
          </ItemsContainer>
        </div>

        <Content>
          <article>
            <p>
              <span>Quantidade</span>
              <small>3 itens</small>
            </p>
            <p>
              <strong>Valor Total</strong>
              <ins>R$ 270,00</ins>
            </p>
          </article>
          <Button>Finalizar Compra</Button>
        </Content>
      </Menu>
    </SideNavContainer>
  )
}
