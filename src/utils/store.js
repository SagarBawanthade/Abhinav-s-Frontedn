import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  
import { authReducer } from '../feature/authSlice.jsx';  

// Persist configuration
const persistConfig = {
  key: 'root',      // This is the key for your persistent store
  storage,          // This indicates that the user data will persist in localStorage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer
  },
});

const persistor = persistStore(store); // Create the persistor for managing persistence

export { store, persistor };
