import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CURRENCY = 'gbp';
const DELIVERY_CHARGE = 10;

/**
 * Creates a Stripe checkout session with product items and delivery fee.
 */
const createStripeSession = async (items, origin, orderId) => {
  const lineItems = items.map(item => ({
    price_data: {
      currency: CURRENCY,
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  // Add delivery charge
  lineItems.push({
    price_data: {
      currency: CURRENCY,
      product_data: { name: 'Delivery Charge' },
      unit_amount: DELIVERY_CHARGE * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${origin}/verify?success=true&orderId=${orderId}`,
    cancel_url: `${origin}/verify?success=false&orderId=${orderId}`,
  });

  return session.url;
};

export default createStripeSession;