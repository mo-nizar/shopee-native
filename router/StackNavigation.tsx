import * as React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import LandingScreen from '@/app/landing';
import ProfileScreen from '@/app/profile';
import ProductScreen from '@/app/product';
import SummaryScreen from '@/app/summary';
import CartScreen from '@/app/cart';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { CartState } from '@/store/cartSlice';
import LoginScreen from '@/app/auth/login';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export type StackParamList = {
  Landing: undefined;
  Product: undefined;
  Summary: undefined;
  Cart: undefined;
  Profile: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type StackNavigationProps = NativeStackScreenProps<StackParamList>;

const StackNavigation: React.FC<StackNavigationProps> = ({ navigate }) => {
  const {cart:{ count: cartCount}, profile} = useSelector((state: CartState) => state);

  const renderCartIcon = () => {
    return (
      <View style={styles.actionsWrapper}>
      <Pressable style={styles.headerRight} onPress={() => navigate('Cart')}>
        {
          cartCount > 0
            ?
            <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>
              {cartCount}
            </Text>
          </View>
          : null
        }
        <Feather name="shopping-cart" size={24} color="white" />
      </Pressable>

      <Pressable style={styles.profile} onPress={() => navigate('Profile')}>
        <FontAwesome5 name="user-circle" size={24} color="white" />
      </Pressable>


      </View>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTitleStyle: styles.title,
        headerRight: renderCartIcon,
        headerLeft: () => <Text style={styles.title}>Shopee</Text>,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} options={{ title: '' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: '' }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: '' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '', headerShown: false }} />

    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  headerRight: {
    paddingLeft:20,
  },
  profile:{
    paddingLeft:20,
  },
  cartBadge: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 20,
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 2,
    zIndex: 1,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    color: Colors.light.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsWrapper:{
    flexDirection:'row',
    // width:'50%',
    alignSelf:'flex-end',
    justifyContent:'center',
    alignItems:'center',
  }
});
