import { configureStore } from '@reduxjs/toolkit';
import bubbleplotReducer from '../pages/production/components/bubbleplot/bubbleplotSlice';


export const store = configureStore({
  reducer: {
    bubbleplotSlice: bubbleplotReducer,
  },
})