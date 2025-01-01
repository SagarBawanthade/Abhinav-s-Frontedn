import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/store.js';
import AppLayout from './components/AppLayout.jsx';

createRoot(document.getElementById('root')).render(
  
<ThemeProvider>
  <StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <AppLayout>
    <App />
    </AppLayout>
    </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
  </ThemeProvider>
 
  

)
