import {configureStore} from '@reduxjs/toolkit'

import {shopApi} from './shopApi'

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: getMiddleware => getMiddleware().concat(shopApi.middleware),
})
