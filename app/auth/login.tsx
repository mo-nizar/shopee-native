import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/store/profileSlice';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { navigate } from '@/router/Route';
import Button from '@/components/Button';
import Screen from '@/Layouts/Screen';
import BackButton from '@/components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthHook } from '@/hooks/useAuthHook';
import { StackParamList } from '@/router/StackNavigation';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type LoginScreenProps = NativeStackScreenProps<StackParamList, 'Login'>;

interface Errors {
  email: string | null;
  password: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const { redirectAfterLogin } = useAuthHook();


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    let valid = true;
    const errorObject = { ...errors };

    if (!email) {
      errorObject.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      errorObject.email = 'Invalid email format';
      valid = false;
    } else {
      errorObject.email = null;
    }

    if (!password) {
      errorObject.password = 'Password is required';
      valid = false;
    } else {
      errorObject.password = null;
    }

    setErrors({ ...errorObject });

    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, is_admin: false }),
      });

      const {status, message, data} = await response.json();      

      if (status == 200) {
        dispatch(setProfile({ email: data.email, token: data.token, name: data.name }));
        redirectAfterLogin();
      } else {
        Alert.alert('Login Failed', message || 'An error occurred. Please try again.');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      Alert.alert('Login Failed', error?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('Signup');
  };

  return (
    <Screen>
      <BackButton onPress={() => navigation.goBack()} style={{marginTop: top}}/>

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.errorInput : null]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        <TextInput
          style={[styles.input, errors.password ? styles.errorInput : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      />
      {/* <Button
        title="Signup"
        onPress={handleSignup}
        style={styles.signupButton}
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    position: 'relative',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.light.primary,
  },
  input: {
    height: 40,
    borderColor: Colors.light.border,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.background,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    ...Shadows.primary,
  },
  signupButton: {
    marginTop: 8,
  },
});

export default LoginScreen;
