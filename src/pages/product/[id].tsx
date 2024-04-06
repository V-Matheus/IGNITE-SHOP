import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductDetails,
  ProductContainer,
} from '@/styles/pages/product';
import axios from 'axios';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string | null;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatedCheckoutSession, setIsCreatedCheckoutSession] =
    useState(false);

  async function handlerBuyProduct() {
    try {
      setIsCreatedCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatedCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout');
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        <button disabled={isCreatedCheckoutSession} onClick={handlerBuyProduct}>Comprar Agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list();
  const paths = response.data.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: price.unit_amount
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price.unit_amount / 100)
          : '0',
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
