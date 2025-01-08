// CartManagement.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, syncLocalCartWithBackend } from '../feature/cartSlice';

const useCartManagement = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = Boolean(userId && token);

  // Single effect to handle cart initialization
  useEffect(() => {
    const initializeCart = async () => {
      if (isLoggedIn) {
        // First, fetch the existing cart from backend
        await dispatch(fetchCartItems({ userId, token }));
        
        // Then, if there are local items, sync them once
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (localCart.length > 0) {
          await dispatch(syncLocalCartWithBackend({ 
            userId, 
            token, 
            localCart: localCart.map(item => ({
              ...item,
              giftWrapping: item.giftWrapping || false
            }))
          }));
          // Clear local storage after successful sync
          localStorage.removeItem('cart');
        }
      }
    };

    initializeCart();
  }, [isLoggedIn, dispatch, userId, token]);

  return {
    cartItems,
    isLoggedIn,
    userId,
    token
  };
};

export default useCartManagement;