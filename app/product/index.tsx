import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { CartState } from '@/store'; // Importing addItemToCart action
import Button from '@/components/Button';
import Screen from '@/Layouts/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { navigate } from '@/router/Route';
import { addToCart } from '@/store/cartSlice';
import { Shadows } from '@/constants/Shadows';
import BackButton from '@/components/BackButton';

interface Product {
  _id: string,
  id: number;
  title: string;
  description: string;
  rating: any;
  image: string;
  price: number;
  is_enabled: boolean;
}

interface Response {
  data: Product[];
}

const ProductScreen: React.FC = ({ route, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  const cart = useSelector((state: CartState) => state?.cart);
  const dispatch = useDispatch();
  const params = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async (id: string): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_ids: [id]
        })
      });
    
      const resData: Response = await response.json();
      const fetchedProduct = resData.data[0];
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { id } = params as { id: string };
    if (id) {
      fetchProduct(id);
    }
  }, [params]);

  const handleAddToCart = (product_id: string) => {
    dispatch(addToCart(product_id));
  };

  const handleCheckout = (product_id: string)=>{
    handleAddToCart(product_id);
    navigate('Cart')
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Screen isScrollable contentContainerStyle={styles.container}>
        <BackButton onPress={()=> navigation.goBack()}/>


        <Image source={{ uri: product.image }} style={styles.image} />
        
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)} AED</Text>
        <Text style={styles.rating}>Rating: {typeof product.rating =='object' ?  product.rating?.rate :  product.rating}</Text>
      </Screen>

      <View style={[styles.buttonWrapper]}>
        <Button 
          title="Add to Cart" 
          onPress={() => handleAddToCart(product._id)} 
          style={styles.buttonContainer(bottom)}
        />
        <Button 
          title="Checkout" 
          onPress={() => handleCheckout(product._id)} 
          style={styles.checkoutButtonContainer(bottom)}
          textStyle={styles.checkoutText}
        />
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: (bottom: any) =>({
    flex:1,
    borderRadius:0,
    paddingBottom: bottom,
  }),

  checkoutButtonContainer: (bottom: any) => ({
    flex:1,
    borderRadius:0,
    backgroundColor: Colors.light.secondary,
    paddingBottom: bottom+15,

  }),

  buttonWrapper: {
    position:'absolute',
    bottom:0,
    width:'100%',
    flexDirection:'row',
    ...Shadows.primary,
  },
  checkoutText:{
    color: Colors.dark.background,
  }
});
