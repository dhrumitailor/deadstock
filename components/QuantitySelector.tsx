"use client"

import { Minus, Plus } from "lucide-react";
import { updateCartQuantity } from "@/app/actions/cart";
import { useTransition } from "react";

interface QuantityProps {
    itemId: string;
    initialQuantity: number;
}

export default function QuantitySelector({ itemId, initialQuantity }: QuantityProps) {
    const [isPending, startTransition] = useTransition();

    const handleUpdate = (newQty: number) => {
        startTransition(() => {
            updateCartQuantity(itemId, newQty);
        });
    };

    return (
        <div className={`flex items-center border border-gray-800 rounded-lg w-fit ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
            <button
                onClick={() => handleUpdate(initialQuantity - 1)}
                disabled={initialQuantity <= 1}
                className="p-2 hover:bg-zinc-800 transition-colors disabled:text-gray-600"
            >
                <Minus size={16} />
            </button>

            <span className="w-10 text-center font-medium text-sm">
                {initialQuantity}
            </span>

            <button
                onClick={() => handleUpdate(initialQuantity + 1)}
                className="p-2 hover:bg-zinc-800 transition-colors"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}