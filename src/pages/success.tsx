import { SuccessContainer, ImageContainer } from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import stripe from 'stripe';

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua <strong>Camiseta Beyond the Limits</strong> já está a caminho
        da sua casa.
      </p>

      <Link href='/'>
        Voltar ao Catálogo
      </Link>
    </SuccessContainer>
  );
}


// export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
//   const sessionId = String(query.session_id);

//   const session = await stripe.checkout.sessions.retrieve(sessionId, {
//     expand: ['line_items', 'line_items.data.price.product'],
//   });

//   const customerName = session.customer_details?.name;
//   const product = session.line_items; //session.line_items.data[0].produc as Stripe.Product

//   return {
//     props: {
//       customerName,
//       product: {
//         name: product?.data[1].price, //product.name
//         imagemUrl: product?.url, //product.images[0]
//       },
//     },
//   };
// };
