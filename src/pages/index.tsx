import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Bag } from "phosphor-react";
import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";
import { HomeContainer, Icon, Product } from "../styles/pages/home";
import { priceFormatter } from "../util/format";

interface HomeProps {
  products: {
    id: string
    name: string
    price: string
    imageUrl: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log('add to cart')
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(({ id, name, price, imageUrl }) => (
          <Link key={id} prefetch={false} href={`/product/${id}`}>
            <Product className="keen-slider__slide">
              <Image src={imageUrl} width={560} height={480} alt="" />
              <footer>
                <div>
                  <strong>{name}</strong>
                  <span>{price}</span>
                </div>
                <Icon onClick={handleAddToCart}>
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
      price: priceFormatter.format(price.unit_amount / 100),
    }
  })

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
