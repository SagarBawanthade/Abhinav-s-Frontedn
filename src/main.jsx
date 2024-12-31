import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer, Bounce } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<ThemeProvider>
  <StrictMode>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    <ToastContainer
position="bottom-center"
autoClose={3500}
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
  </Provider>
  

)
