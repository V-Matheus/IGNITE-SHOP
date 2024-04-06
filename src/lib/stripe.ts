import Strip from 'stripe'

export const stripe = new Strip(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop'
  }
})