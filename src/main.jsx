import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";

import { ToastContainer, Bounce } from 'react-toastify';
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
    
    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </StrictMode>
  </ThemeProvider>
 
  

)
