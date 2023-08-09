import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducer';

export const store = configureStore({
  reducer: {
    mapReducer,
    
  },
});

export default store
