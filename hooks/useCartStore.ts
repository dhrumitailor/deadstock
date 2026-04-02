import { create } from 'zustand';

interface CartState {
    count: number;
    setCount: (count: number) => void;
    // This helper will let us pull the initial count from Supabase
    fetchCount: (supabase: any, userId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
    fetchCount: async (supabase, userId) => {
        const { count, error } = await supabase
            .from('cart_items')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (!error) set({ count: count || 0 });
    },
}));