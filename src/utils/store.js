// Store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../feature/authSlice';
import { cartReducer } from '../feature/cartSlice';
import { wishlistReducer } from '../feature/wishlistSlice';


// Separate persist configs for auth and wishlist
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['id','role', 'token'] // specify which auth state fields to persist
};




const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['items', 'userId'] // specify which wishlist state fields to persist
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
    wishlist: persistedWishlistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };