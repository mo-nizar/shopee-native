import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RedirectState {
  route: string | null;
}

const initialState: RedirectState = {
  route: null,
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirectRoute: (state, action: PayloadAction<string | null>) => {
      state.route = action.payload;
    },
    clearRoute() {
      return initialState;
    },
  },
});

export const { setRedirectRoute, clearRoute } = redirectSlice.actions;

export default redirectSlice.reducer;
