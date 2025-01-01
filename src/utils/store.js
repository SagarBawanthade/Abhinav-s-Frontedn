import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage or sessionStorage
import { authReducer } from '../feature/authSlice';
import { cartReducer } from '../feature/cartSlice'; // Assuming you have cartSlice





const persistConfig = {
  key: 'root',
  storage,

 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
