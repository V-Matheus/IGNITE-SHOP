import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hendler(req: NextApiRequest, res: NextApiResponse) {
const priceId = 'price_1P2eNqRtmnOZTtBQXHyc5Hdp'
const success_url = `${process.env.NEXT_URL}/success`
const cancel_url = `${process.env.NEXT_URL}/`

  const checkoutSection = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSection.url,
  })
}