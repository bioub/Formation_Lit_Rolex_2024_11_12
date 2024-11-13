import { createContext } from '@lit/context';
import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducers';

export const storeContext = createContext('store');
export const store = configureStore({
  reducer: reducer,
});
