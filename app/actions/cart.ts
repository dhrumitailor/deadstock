"use server"

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function removeFromCart(itemId: string) {
    const { error } = await supabaseServer
        .from("cart_items")
        .delete()
        .eq("id", itemId);

    if (error) {
        console.error("Delete error:", error);
        return;
    }

    // This forces the Cart page to refresh and show the item is gone
    revalidatePath("/cart");
}
export async function updateCartQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return; // Prevent negative quantities

    const { error } = await supabaseServer
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId);

    if (error) {
        console.error("Update error:", error);
        return;
    }

    revalidatePath("/cart");
}