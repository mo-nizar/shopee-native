import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CartState {
  products: CartItem[];
  count: number;
}

const initialState: CartState = {
  products: [],
  count: 0,
};

const updateCount = (products: CartItem[]): number => {
  return products.reduce((total, item) => total + item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(item => item.product_id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product_id: productId, quantity: 1 });
      }
      state.count = updateCount(state.products);
    },
    
    clearCartItem: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(item => item.product_id !== action.payload);
      state.count = updateCount(state.products);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(item => item.product_id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter(item => item.product_id !== productId);
        }
        state.count = updateCount(state.products);
      }
    },

    clearCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
