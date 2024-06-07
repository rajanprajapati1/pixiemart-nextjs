import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process?.env?.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  try {
    const { payload } = await req.json();
    const { items , user } = payload;
    const line_items = items?.map((val) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: val?.product?.name,
          images: [val?.product?.image],
          metadata: {
            productId: val?.product?._id, 
          },
        },
        unit_amount: val?.product?.finalPrice * 100, // Stripe expects amount in cents
      },
      quantity: val?.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],  
      line_items: line_items,
      client_reference_id : user,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      metadata: {
        userId: user,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({
      msg: 'failed',
      error: error.message,
    });
  }
}