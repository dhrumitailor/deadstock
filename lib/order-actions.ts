// "use server"
// import { createClient } from '@/lib/server';

// export async function processSuccessfulOrder(userId: string, totalAmount: number) {
//     const supabase = await createClient();

//     // 1. Get cart items AND current stock for those products
//     const { data: cartItems } = await supabase
//         .from('cart_items')
//         .select('*, products(id, price, stock_quantity)')
//         .eq('user_id', userId);

//     if (!cartItems || cartItems.length === 0) return null;

//     // 2. CHECK STOCK: Ensure items are actually available
//     for (const item of cartItems) {
//         if (!item.products.stock_quantity || item.products.stock_quantity < item.quantity) {
//             throw new Error(`Item ${item.products.id} is out of stock.`);
//         }
//     }

//     // 3. Create the main Order
//     const { data: order, error: orderError } = await supabase
//         .from('orders')
//         .insert({
//             user_id: userId,
//             total_amount: totalAmount,
//             status: 'paid'
//         })
//         .select()
//         .single();

//     if (orderError) throw orderError;

//     // 4. SUBTRACT STOCK & Move items to order_items
//     for (const item of cartItems) {
//         // Decrease inventory
//         await supabase
//             .from('products')
//             .update({ stock_quantity: item.products.stock_quantity - item.quantity })
//             .eq('id', item.product_id);

//         // Record the purchase
//         await supabase.from('order_items').insert({
//             order_id: order.id,
//             product_id: item.product_id,
//             quantity: item.quantity,
//             price_at_purchase: item.products.price
//         });
//     }

//     // 5. Clear the Cart
//     await supabase.from('cart_items').delete().eq('user_id', userId);

//     return order.id;
// }
//final touch
"use server"
import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';

export async function processSuccessfulOrder(userId: string, totalAmount: number) {
    const supabase = await createClient();

    // 1. Get cart items AND current stock
    const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*, products(id, price, stock_quantity)')
        .eq('user_id', userId);

    if (!cartItems || cartItems.length === 0) return null;

    // 2. CHECK STOCK
    for (const item of cartItems) {
        if (!item.products.stock_quantity || item.products.stock_quantity < item.quantity) {
            throw new Error(`Item ${item.products.id} is out of stock.`);
        }
    }

    // 3. Create the main Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId,
            total_amount: totalAmount,
            status: 'paid'
        })
        .select()
        .single();

    if (orderError) throw orderError;

    // 4. SUBTRACT STOCK & Move items to order_items
    for (const item of cartItems) {
        await supabase
            .from('products')
            .update({ stock_quantity: item.products.stock_quantity - item.quantity })
            .eq('id', item.product_id);

        await supabase.from('order_items').insert({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_purchase: item.products.price
        });
    }

    // 5. Clear the Cart
    await supabase.from('cart_items').delete().eq('user_id', userId);

    // Refresh pages to show new order and updated stock
    revalidatePath('/profile/orders');
    revalidatePath('/admin');

    return order.id;
}