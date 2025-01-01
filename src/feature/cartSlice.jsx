//cartSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',async ({userId, token },{ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/cart/${userId}`,
        { 
          headers: 
          { Authorization: `Bearer ${token}` } 
        }
      );
      console.log("Response of CartSlice: ", response);
      return response.data.cart.items; 
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove an item from the cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ userId, token, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/cart/remove-item`,
        {
          userId: userId,
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Returns data to update Redux state
    } catch (error) {
      return rejectWithValue(error.response.data); // In case of failure
    }
  }
);



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        console.log("Fetching cart items..."); // Debug
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
        console.log("Cart items updated: ", action.payload); // Debug
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error("Failed to fetch cart items: ", action.payload); // Debug
      })
      // Add the handling for removing item
    .addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Remove the item from the cart state after successful removal
      state.items = state.items.filter(item => item._id !== action.payload._id); 
    })
    .addCase(removeItemFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
      
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
