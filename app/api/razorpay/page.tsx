import { createClient } from '@/lib/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // 1. SECURITY: Verify the request actually came from Razorpay
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex');

    if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // 2. LOGIC: If payment is successful, move data from Cart to Orders
    if (event.event === 'order.paid') {
        const paymentData = event.payload.payment.entity;
        const userId = paymentData.notes.user_id; // Pass this from frontend during checkout

        // Fetch user's current cart items
        const { data: cartItems } = await supabase
            .from('cart_items')
            .select('*, products(*)')
            .eq('user_id', userId);

        if (cartItems && cartItems.length > 0) {
            // A. Create the Order
            const { data: order } = await supabase
                .from('orders')
                .insert({
                    user_id: userId,
                    total_amount: paymentData.amount / 100, // Razorpay sends in paise
                    status: 'paid',
                    shipping_address: paymentData.notes.address,
                    razorpay_order_id: paymentData.order_id
                })
                .select()
                .single();

            // B. Move items to order_items & Reduce Stock
            for (const item of cartItems) {
                await supabase.from('order_items').insert({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_purchase: item.products.price
                });

                // Reduce inventory
                await supabase.rpc('decrement_stock', {
                    product_id: item.product_id,
                    qty: item.quantity
                });
            }

            // C. Clear the Cart
            await supabase.from('cart_items').delete().eq('user_id', userId);
        }
    }

    return NextResponse.json({ status: 'ok' });
}