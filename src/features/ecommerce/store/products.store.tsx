import create from "zustand";
import { devtools } from "zustand/middleware";

import { CartProduct, Product } from "../types/ecommerce";
import FetchApi from "../../../shared/services/FetchApi";
import { FetchError } from "../../../shared/services/FetchError";

interface ProductState {
  // STATE
  isLoading: boolean;
  error: FetchError | null;
  products: Product[];
  selectedProduct: Product | null;
  cart: CartProduct[];
  // ACTIONS
  getProducts: (query?: string) => void;
  getProduct: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const useProducts = create<ProductState>()(
  devtools((set, get) => ({
    // initial state
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    cart: [],
    getProducts: async (query) => {
      try {
        set({ isLoading: true, error: null });
        const suffix = query ? `?title=${query}` : "";
        const response = await FetchApi.get("/api/products" + suffix);
        set(
          { products: response.data, isLoading: false },
          false,
          "getProducts" // to track the action on devtools
        );
      } catch (error) {
        set({ error: error as FetchError, isLoading: false });
      }
    },
    getProduct: async (id: string) => {
      try {
        set({ isLoading: true, error: null });
        const response = await FetchApi.get("/api/products/" + id);
        set(
          { selectedProduct: response.data, isLoading: false },
          false,
          "getProduct"
        );
      } catch (error) {
        set({ error: error as FetchError, isLoading: false });
      }
    },
    addToCart: (id: string) => {
      const currentProducts = get().products;
      const productIndexInStore = currentProducts.findIndex((p) => p.id === id);
      const productIndexInCart = get().cart.findIndex((p) => p.id === id);
      if (
        productIndexInStore !== -1 &&
        currentProducts[productIndexInStore].count > 0
      ) {
        if (productIndexInCart === -1) {
          set(
            {
              cart: [
                ...get().cart,
                {
                  id,
                  title: currentProducts[productIndexInStore].title,
                  cost: currentProducts[productIndexInStore].cost,
                  count:
                    productIndexInCart === -1
                      ? 1
                      : get().cart[productIndexInCart].count + 1,
                },
              ],
            },
            false,
            "addToCart:product-not-present"
          );
        } else {
          const currentCart = [...get().cart];
          currentCart[productIndexInCart].count++;
          set(
            { cart: currentCart },
            false,
            "addToCart:product-already-present"
          );
        }
        currentProducts[productIndexInStore].count--;
        set({ products: currentProducts });
      }
    },
    removeFromCart: (id: string) => {
      const currentProducts = get().products;
      const currentProductsInCart = get().cart;
      const productIndexInStore = currentProducts.findIndex((p) => p.id === id);
      const productIndexInCart = get().cart.findIndex((p) => p.id === id);
      if (
        productIndexInStore !== -1 &&
        currentProductsInCart[productIndexInCart].count > 1
      ) {
        const currentCart = [...get().cart];
        currentCart[productIndexInCart].count--;
        set(
          { cart: currentCart },
          false,
          "removeFromCart:product-more-than-one"
        );
      } else if (currentProductsInCart[productIndexInCart].count === 1) {
        set(
          {
            cart: [...get().cart.filter((p) => p.id !== id)],
          },
          false,
          "removeFromCart:product-only-one"
        );
      }
      currentProducts[productIndexInStore].count++;
      set({ products: currentProducts });
    },
  }))
);
