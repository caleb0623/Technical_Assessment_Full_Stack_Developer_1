import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ItemsState {
  items: Item[];
  selectedItemId: number | null;
}

const initialState: ItemsState = {
  items: [],
  selectedItemId: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    setSelectedItemId(state, action: PayloadAction<number | null>) {
      state.selectedItemId = action.payload;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setItems, setSelectedItemId, addItem, updateItem, deleteItem } = itemsSlice.actions;

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
