import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]

  addProductToCart: (product: CartProduct) => void
}

export const useCartStore = create<State>((set, get) => ({
  cart: [],

  addProductToCart: (product: CartProduct) => {
    const { cart } = get()

    // Revisar si el producto existe en el carrito con la talla seleccionada
    const productInCart = cart.some((item) => item.id === product.id && item.size === product.size)

    // Si no existe, agregar el producto al carrito
    if (!productInCart) {
      set({ cart: [...cart, product] })
      return
    }

    // El producto existe, hay que incrementar la cantidad
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + 1 }
      }

      return item
    })

    set({ cart: updatedCartProducts })
  }
}))
