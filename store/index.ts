import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import cartReducer from './cartSlice';
import redirectReducer from './redirectSlice';


export interface RootState{
  [key: string]: any
}


export default configureStore({
  reducer: {
    profile: profileReducer,
    cart: cartReducer,
    redirect: redirectReducer,
  },
});
