import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from 'payload';
// A type for a cart item
export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  vendor: User
  featuredImage: string
  checkInDate: string
  checkOutDate: string
  [key: string]: any
}

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: 'cart-storage', // key in localStorage
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
)
