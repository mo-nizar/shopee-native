import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { createRef, RefObject } from 'react';
import StackNavigation from './StackNavigation';

export const navigationRef: RefObject<NavigationContainerRef<any>> = createRef();

interface NavigationParams {
  [key: string]: any;
}

export const navigate = (name: string, params?: NavigationParams) => {
  navigationRef.current?.navigate(name, params);
};

const Route: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={() => {}} independent={true}>
      <StackNavigation navigate={navigate} />
    </NavigationContainer>
  );
};

export default Route;
