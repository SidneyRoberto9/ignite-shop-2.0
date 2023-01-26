import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Bag } from "phosphor-react";
import { useContext } from "react";
import Stripe from "stripe";

import { ShoppingCart } from "../context/ShoppingCartContext";
import { IProduct } from "../domain/Product";
import { stripe } from "../lib/stripe";
import { HomeContainer, Icon, Product } from "../styles/pages/home";
import { priceFormatter } from "../util/format";

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { addToCart } = useContext(ShoppingCart)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) {
    event.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product.id}
            prefetch={false}
            href={`/product/${product.id}`}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={560} height={480} alt="" />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{priceFormatter.format(product.price / 100)}</span>
                </div>
                <Icon onClick={(event) => handleAddToCart(event, product)}>
                  <Bag size={24} />
                </Icon>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: 1,
      defaultPriceId: price.id,
      description: product.description,
      price: price.unit_amount,
    }
  })

  //Usando esse filtro only my products
  const productsData = products.filter(
    (product) => product.name !== 'Subscription',
  )

  return {
    props: {
      products: productsData,
    },
    revalidate: 60 * 60 * 5, // 5 hours
  }
}
