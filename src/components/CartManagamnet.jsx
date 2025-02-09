import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, syncLocalCartWithBackend } from '../feature/cartSlice';

const useCartManagement = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = Boolean(userId && token);
  const hasSynced = useRef(false);
  useEffect(() => {


  

    

    const initializeCart = async () => {
      // Check if there's a local cart before doing anything
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      if (isLoggedIn) {
        try {
          // First, fetch the existing cart from backend
          await dispatch(fetchCartItems({ userId, token })).unwrap();
          
          // Only sync if there are actually local items
          if (localCart.length > 0) {
            console.log('Syncing local cart:', localCart); // Debug log
            await dispatch(syncLocalCartWithBackend({ 
              userId, 
              token, 
              localCart: localCart.map(item => ({
                ...item,
                giftWrapping: item.giftWrapping || false
              }))
            })).unwrap();
            
            // Clear local storage after successful sync
            localStorage.removeItem('cart');
            hasSynced.current = true;
            
          }
        } catch (error) {
          console.error('Error in cart initialization:', error);
          hasSynced.current = false;
        }
      }
    };

    initializeCart();
  }, [isLoggedIn, dispatch, userId, token]); // Make sure isLoggedIn is in dependencies

  return {
    cartItems,
    isLoggedIn,
    userId,
    token
  };
};

export default useCartManagement;