import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";

import { ShoppingCart } from "../context/ShoppingCartContext";
import { SideNavController } from "../context/SideNavControllerContext";
import { Button, Content, Item, ItemsContainer, SideNavContainer } from "../styles/components/sidenav";
import { priceFormatter } from "../util/format";

export function SideNav() {
  const { toggleSideNav, isOpen } = useContext(SideNavController)
  const { productList, removeToCart, valueTotal, productSize } =
    useContext(ShoppingCart)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false)

  const shoppingCartIsEmpty = productSize == 0

  async function handleBuyProduct() {
    const items = productList.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    }))

    try {
      setIsCreatingCheckoutSession(true)
      const { data } = await axios.post('/api/checkout', {
        lineItems: items,
      })

      window.location.href = data.checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <SideNavContainer>
      <Menu
        right
        isOpen={isOpen}
        width={'32rem'}
        customBurgerIcon={false}
        onStateChange={(state) => toggleSideNav(state.isOpen)}
        className="side-nav"
      >
        <div>
          <h1>Sacola de Compras</h1>

          <ItemsContainer>
            {productList.map((product) => (
              <Item key={product.id}>
                <ins>
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={100}
                    height={93}
                  />
                </ins>

                <article>
                  <small>
                    <p>{product.name}</p>
                    <strong>
                      {priceFormatter.format(product.price / 100)}
                    </strong>
                  </small>

                  <span onClick={() => removeToCart(product.id)}>Remover</span>
                </article>
              </Item>
            ))}
          </ItemsContainer>
        </div>

        <Content>
          <article>
            <p>
              <span>Quantidade</span>
              <small>{productSize} itens</small>
            </p>
            <p>
              <strong>Valor Total</strong>
              <ins>{priceFormatter.format(valueTotal / 100)}</ins>
            </p>
          </article>
          <Button
            onClick={handleBuyProduct}
            disabled={shoppingCartIsEmpty || isCreatingCheckoutSession}
          >
            Finalizar Compra
          </Button>
        </Content>
      </Menu>
    </SideNavContainer>
  )
}
