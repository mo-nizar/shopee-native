import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartState } from '@/store'; // Importing addItemToCart action
import Button from '@/components/Button';
import Screen from '@/Layouts/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { navigate } from '@/router/Route';
import { addToCart } from '@/store/cartSlice';
import { Shadows } from '@/constants/Shadows';
import CartComponent from '@/components/CartComponent';
import BackButton from '@/components/BackButton';
import { useAuthHook } from '@/hooks/useAuthHook';

interface Product {
  _id: string,
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  price: number;
  is_enabled: boolean;
}

interface Response {
  status: number;
  message: string,
  data: any,
}

const CartScreen: React.FC = ({ route, navigation}) => {
  const { bottom } = useSafeAreaInsets();
  const { isLoggedIn } = useAuthHook();

  const { products: cartProducts } = useSelector((state: CartState) => state.cart);
  const { token, email } = useSelector((state: CartState) => state.profile);

  const dispatch = useDispatch();
  const params = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProduct = async (productIds: string[]): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_ids: productIds
        })
      });

      const resData: Response = await response.json();
      const fetchedProduct = resData.data;
      setProductList(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/create`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
          'email': `${email}`,
        },
        body: JSON.stringify({
          cart_products: cartProducts
        })
      });

      const {status, message, data}: Response = await response.json();

      if(status == 200){
        console.log(data);

      };
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productIds = cartProducts.map(item => item.product_id);
    if (productIds.length) {
      fetchProduct(productIds);
    } else {
      setProductList([]);
    }
  }, [cartProducts]);

  const handlePayment = () => {
    if(isLoggedIn(route.name)){
      submitOrder();
      navigate('Summary');
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Screen>
        <BackButton onPress={() => navigation.goBack()} />
        <FlatList
          data={productList?.filter(product => 
            cartProducts.some((cartProduct: any) => cartProduct.product_id === product._id)
          )}
          renderItem={({ item }) => <CartComponent item={item} />}
          keyExtractor={(item, idx) => item._id.toString() + idx}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Screen>

      <View style={[styles.buttonWrapper]}>
        <Button 
          title="Pay Now" 
          onPress={() => handlePayment()} 
          style={styles.buttonContainer(bottom)}
        />
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    ...Shadows.primary,
  },
  buttonContainer: (bottom: any) => ({
    position: 'absolute',
    flex: 1,
    borderRadius: 0,
    paddingBottom: bottom,
    padding: 15,
    bottom: 0,
    width: '100%',
  }),
});
