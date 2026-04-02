"use client"

import { Trash2 } from "lucide-react";
import { removeFromCart } from "@/app/actions/cart";
import { useTransition } from "react";

export default function DeleteCartItem({ itemId }: { itemId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => startTransition(() => removeFromCart(itemId))}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 transition-colors p-2"
            aria-label="Remove item"
        >
            <Trash2 size={20} className={isPending ? "animate-pulse" : ""} />
        </button>
    );
}