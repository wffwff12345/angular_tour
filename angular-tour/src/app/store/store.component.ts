import {configureStore } from '@reduxjs/toolkit'
import {counterSlice } from './reducers.component'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig={
  key:'root',
  storage,
  whitelist:['name'],
}
//const myreducer=persistReducer(persistConfig,counterSlice.reducer);
const store = configureStore({
  reducer: counterSlice.reducer,
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware({
  //     serializableCheck: false
  //   })
  // }
})
//const persistor=persistStore(store);
export{
  store,
  
}