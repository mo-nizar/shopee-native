import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps extends ScrollViewProps {
  isScrollable?: boolean;
  containerStyle?: ViewStyle;
}

const Screen: React.FC<ScreenProps> = ({ isScrollable = false, containerStyle, children, ...scrollViewProps }) => {
  const { bottom } = useSafeAreaInsets();

  const containerStyles = [styles.container, { paddingBottom: bottom }, containerStyle];

  return isScrollable ? (
    <ScrollView contentContainerStyle={containerStyles} {...scrollViewProps}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, containerStyles]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Screen;
