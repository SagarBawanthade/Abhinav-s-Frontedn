//cartSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? { items: JSON.parse(savedCart), status: 'idle', error: null } 
                    : { items: [], status: 'idle', error: null };
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    return { items: [], status: 'idle', error: null };
  }
};




// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',async ({userId, token },{ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://backend.abhinavsofficial.com/api/cart/cart/${userId}`,
        { 
          headers: 
          { Authorization: `Bearer ${token}` } 
        }
      );
      
      return response.data.cart.items; 
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove an item from the cart

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ userId, token, product }, { rejectWithValue }) => {
    console.log('Removing item:', product);
    try {
      const response = await axios.delete(
        `https://backend.abhinavsofficial.com/api/cart/cart/remove-item/${userId}/${product}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { ...response.data, product };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item');
    }
  }
);

// // Async thunk to sync local cart with backend
// export const syncLocalCartWithBackend = createAsyncThunk(
//   'cart/syncLocalCart',
//   async ({ userId, token, localCart }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://backend.abhinavsofficial.com/api/cart/sync-cart',
//         { userId, items: localCart },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return response.data.cart.items;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );




// export const syncLocalCartWithBackend = createAsyncThunk(
//   'cart/syncLocalCart',
//   async ({ userId, token, localCart }, { rejectWithValue }) => {
//     try {
//       // Transform local cart items if necessary
//       const itemsToSync = localCart.map(item => ({
//         product: item.product,
//         quantity: item.quantity,
//         size: item.size,
//         color: item.color,
//         price: item.price,
//         name: item.name,
//         images: item.images,
//         giftWrapping: item.giftWrapping
//       }));

//       const response = await axios.post(
//         'https://backend.abhinavsofficial.com/api/cart/sync-cart',
//         { 
//           userId, 
//           items: itemsToSync 
//         },
//         { 
//           headers: { Authorization: `Bearer ${token}` } 
//         }
//       );

//       // Clear local storage after successful sync
//       localStorage.removeItem('cart');
      
//       return response.data.cart.items;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to sync cart');
//     }
//   }
// );

export const syncLocalCartWithBackend = createAsyncThunk(
  'cart/syncLocalCart',
  async ({ userId, token, localCart }, { rejectWithValue }) => {
    try {
      // Remove duplicates before syncing
      const uniqueItems = localCart.reduce((acc, item) => {
        const key = `${item.product}_${item.size}_${item.color}`;
        if (!acc[key]) {
          acc[key] = item;
        } else {
          acc[key].quantity += item.quantity;
        }
        return acc;
      }, {});

      const itemsToSync = Object.values(uniqueItems).map(item => ({
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.price,
        name: item.name,
        images: item.images,
        giftWrapping: item.giftWrapping || false
      }));

      const response = await axios.post(
        'https://backend.abhinavsofficial.com/api/cart/sync-cart',
        { userId, items: itemsToSync },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem('cart');
      return response.data.cart.items;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to sync cart');
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: loadInitialState(),
  reducers: {
    addToLocalCart: (state, action) => {
      console.log('Adding to local cart:', action.payload);
      const { product, name, price, quantity, color, size, images = [], giftWrapping = false } = action.payload;

      console.log("Images after destructuring:", images);

      const existingItemIndex = state.items.findIndex(
        item => item.product === product && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ product, name, price, quantity, color, size, images, giftWrapping });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    loadLocalStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        state.items = JSON.parse(savedCart);
      }
    },
  

    clearLocalCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    



    removeFromLocalCart: (state, action) => {
      const { product } = action.payload;
      
      // Filter out the item from the cart
      state.items = state.items.filter(item => item.product !== product); 
      
      // Update localStorage with the new cart state
      localStorage.setItem('cart', JSON.stringify(state.items)); 
    },


    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
        
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
       
      })
      .addCase(syncLocalCartWithBackend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        // Clear local storage as items are now synced
        localStorage.removeItem('cart');
      })
      .addCase(syncLocalCartWithBackend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    .addCase(removeItemFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
      
  },
});

export const { clearCart,addToLocalCart, 
  loadLocalCart, 
  clearLocalCart, removeFromLocalCart, loadLocalStorage} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
