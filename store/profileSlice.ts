import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  name: null,
  token: null,
  isLoggedIn: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => ({
      ...state,
      ...action?.payload,
      isLoggedIn: true,
    }),
    clearProfile() {
      return initialState;
    },
  },
});

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
