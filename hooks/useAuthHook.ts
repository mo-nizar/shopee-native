import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@/router/Route'; // Adjust the import based on your project structure
import { RootState } from '@/store'; // Adjust the import based on your project structure
import { setRedirectRoute } from '@/store/redirectSlice'; // Adjust the import based on your project structure
import { useEffect } from 'react';

export const useAuthHook = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const redirectRoute = useSelector((state: RootState) => state.redirect.route);

  const isLoggedIn = (routeName) => {
    if (profile.token) {
      return true;
    } else {
      dispatch(setRedirectRoute(routeName));
      navigate('Login');
      return false;
    }
  };

  const redirectAfterLogin = () => {
    if (redirectRoute) {
      navigate(redirectRoute);
      dispatch(setRedirectRoute(null));
    } else {
      navigate('Landing');
    }
  };

  return {
    isLoggedIn,
    redirectAfterLogin,
  };
};
