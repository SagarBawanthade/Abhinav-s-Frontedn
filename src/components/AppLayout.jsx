import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../feature/cartSlice';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // console.log('Redux State - auth:', { userId, token });
    if (userId && token) {
      dispatch(fetchCartItems({ userId, token }));
    }
  }, [dispatch, userId, token]);

  useEffect(() => {
    // console.log('Cart Items:', cartItems);
  }, [cartItems]);

  return <>{children}</>;
};


export default AppLayout;
