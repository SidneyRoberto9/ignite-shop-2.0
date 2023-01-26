import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Stripe from "stripe";

import { ShoppingCart } from "../../context/ShoppingCartContext";
import { IProduct } from "../../domain/Product";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { priceFormatter } from "../../util/format";

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useContext(ShoppingCart)

  const { name, imageUrl, price, description, defaultPriceId } = product

  function handleAddToCart() {
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{priceFormatter.format(price / 100)}</span>

          <p>{description}</p>

          <button onClick={handleAddToCart}>Coloca na Sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_NDXkCWvkQfD9Xn',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        quantity: 1,
        defaultPriceId: price.id,
        description: product.description,
        price: price.unit_amount,
      },
    },
    revalidate: 60 * 60 * 5, // 5 hours
  }
}
