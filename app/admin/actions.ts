// 'use server'
// import { createClient } from '@/lib/server';
// import { revalidatePath } from 'next/cache';

// export async function updateOrderStatus(orderId: string, status: string, trackingId?: string) {
//     const supabase = await createClient();




//     await supabase
//         .from('orders')
//         .update({ status, tracking_id: trackingId })
//         .eq('id', orderId);

//     revalidatePath('/admin/orders'); // Refresh the dashboard automatically
// }
'use server'

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';

/**
 * Updates the order status and tracking information.
 * If an order is cancelled, it returns the stock to the product inventory.
 */
export async function updateOrderStatus(orderId: string, status: string, trackingId?: string) {
    const supabase = await createClient();

    // 1. Get the current order and its items first (Needed for stock restoration)
    const { data: order } = await supabase
        .from('orders')
        .select('status, order_items(product_id, quantity)')
        .eq('id', orderId)
        .single();

    if (!order) return;

    // 2. STOCK RESTORATION LOGIC
    // If the owner changes status TO 'cancelled' and it wasn't already cancelled
    if (status === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.order_items) {
            // Fetch current stock
            const { data: product } = await supabase
                .from('products')
                .select('stock_quantity')
                .eq('id', item.product_id)
                .single();

            if (product) {
                // Add the items back to the vault
                await supabase
                    .from('products')
                    .update({ stock_quantity: (product.stock_quantity || 0) + item.quantity })
                    .eq('id', item.product_id);
            }
        }
    }

    // 3. Update the Order in the database
    const { error } = await supabase
        .from('orders')
        .update({
            status: status,
            tracking_id: trackingId || null
        })
        .eq('id', orderId);

    if (error) {
        console.error("Order Update Error:", error.message);
        throw new Error("Failed to update order status");
    }

    // 4. Refresh the Admin UI
    revalidatePath('/admin/orders');
    revalidatePath('/admin/products'); // Refresh stock numbers in the inventory list
}