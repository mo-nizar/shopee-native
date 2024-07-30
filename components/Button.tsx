import { Colors } from '@/constants/Colors';
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle, disabled = false }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button(disabled), style]} disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: (disabled)=>({
    backgroundColor: disabled ? Colors.light.icon : Colors.light.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  }),
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 700,
  },
});

export default Button;
