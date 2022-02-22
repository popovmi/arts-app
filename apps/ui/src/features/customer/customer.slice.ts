import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

type CustomersState = {
  editCustomerId?: string;
  showCreateCustomer?: boolean;
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: {} as CustomersState,
  reducers: {
    setEditCustomerId: (state, action) => {
      state.editCustomerId = action.payload;
    },
    setShowCreateCustomer: (state, action) => {
      state.showCreateCustomer = action.payload;
    },
  },
});

export const customerReducer = customerSlice.reducer;
export const { setEditCustomerId, setShowCreateCustomer } = customerSlice.actions;

export const selectCustomers = (state: RootState) => {
  const { editCustomerId, showCreateCustomer } = state.customer;

  return { editCustomerId, showCreateCustomer };
};
