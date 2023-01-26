import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";
import { ImageContainer, ImageDataContainer, SuccessContainer } from "../styles/pages/success";
import { capitalizeText } from "../util/format";

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageDataContainer>
          {products.map((product) => (
            <ImageContainer>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImageDataContainer>

        <p>
          Uhuul <strong>{capitalizeText(customerName)}</strong>, sua compra de
          {' ' + products.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href={'/'}>Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name

  const Products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName: customerName,
      products: Products,
    },
  }
}
