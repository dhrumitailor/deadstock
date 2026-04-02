
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Updated interface to include selectedSize
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string | string[];
  selectedSize: string; // Critical for separate line items
  quantity: number;
}

interface StoreState {
  cart: CartItem[];

  // Cart Actions
  addToCart: (product: any, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, size) => {
        const cart = get().cart;

        // Check for item with BOTH same ID and same Size
        const existingItem = cart.find(
          (item) => item.id === product.id && item.selectedSize === size
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id && item.selectedSize === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add as a new line item
          set({
            cart: [...cart, {
              id: product.id,
              title: product.title,
              price: product.price,
              image: Array.isArray(product.image) ? product.image[0] : product.image,
              selectedSize: size,
              quantity: 1
            }]
          });
        }
      },

      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity < 1) return;
        set({
          cart: get().cart.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'deadstock-dept-storage', // Saves cart in browser LocalStorage
    }
  )
);
