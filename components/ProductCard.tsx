import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { navigate } from '@/router/Route';
import { addToCart } from '@/store/cartSlice';
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from './Button';

const screenWidth = Dimensions.get('window').width;

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const ProductCard: ListRenderItem<Product> = ({ item }) => {
  const dispatch = useDispatch();

  const handleProductClick = (id: string) => {
    navigate('Product', {id})
  };  

  return (
    <View style={styles.productContainer}>
      <Pressable style={styles.detailsWrapper} onPress={() => handleProductClick(item._id)}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
        <Text style={styles.prodTitle}>{item.title}</Text>
        <Text style={styles.price}>{item.price} {'AED'}</Text>
      </Pressable>

      <Button style={styles.addButton} textStyle={styles.textStyle} onPress={() => dispatch(addToCart(item._id))} title='Add to Cart'/>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 8,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    maxWidth: (screenWidth / 2) - 24,
    ...Shadows.primary,
  },
  detailsWrapper: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: (screenWidth / 2) - 24,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  prodTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: Colors.light.secondary,
    padding: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  textStyle:{
    color: 'black',
  }
});

export default ProductCard;
