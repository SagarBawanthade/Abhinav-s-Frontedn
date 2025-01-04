// WishlistSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  userId: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.items.find(item => item._id === action.payload._id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  }
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist,
  setUserId 
} = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;