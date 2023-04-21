import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'

import {ProductPreviewInfo as ProductI} from 'src/types'

interface RecentlyWatchedSliceState {
  items: ProductI[]
}

const initialState: RecentlyWatchedSliceState = {
  items: [],
}

export const recentlyWatchedSlice = createSlice({
  name: 'recentlyWatched',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductI>) => {
      const newItem = action.payload
      if (
        state.items.findIndex(it => it.productId === newItem.productId) === -1
      ) {
        let updatedItems = [...state.items, newItem]
        if (updatedItems.length > 25) {
          updatedItems = updatedItems.slice(-25)
        }
        state.items = updatedItems
      }
    },
  },
})

export const {addItem: addItemToRecently} = recentlyWatchedSlice.actions

const recentlyWatchedReducer = recentlyWatchedSlice.reducer

const recentlyWatchedConfig = {
  key: 'recentlyWatched',
  version: 1,
  storage: AsyncStorage,
}

export const persistedRecentlyWatchedReducer = persistReducer(
  recentlyWatchedConfig,
  recentlyWatchedReducer,
)
