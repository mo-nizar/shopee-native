import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ensure you're using expo-vector-icons or adjust import if using a different library

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle,
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
  return (
    <Pressable style={[styles.backButton, style]} onPress={onPress}>
      <Feather name="arrow-left" size={24} color="black" />
      <Text style={styles.backButtonText}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  } as TextStyle,
});

export default BackButton;
