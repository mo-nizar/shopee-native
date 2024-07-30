import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { navigate } from '@/router/Route';
import { addToCart, removeFromCart, CartState, clearCart } from '@/store/cartSlice';

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
}

interface CartItemProps {
  item: Product;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {

  const {products} = useSelector((state: CartState) => state?.cart);

  const [cartProducts, setCartProducts] = useState({});

  const dispatch = useDispatch();

  const handleProductClick = (id: string) => {
    navigate('Product', { id });
  };

  const handleIncreaseQuantity = () => {
    dispatch(addToCart(item._id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(removeFromCart(item._id));
  };

  const handleRemoveItem = () => {
    dispatch(clearCart(item._id));
  };


  useEffect(()=>{
    filterCartItems();
  },[products]);
  

  const filterCartItems = () =>{
    const cartProd: any={};
    products.forEach((element: any) => {
      cartProd[element.product_id] = element.quantity
    });    
    setCartProducts(cartProd);
  }

  return (
    <View style={styles.cardContainer}>
      <Pressable style={styles.detailsWrapper} onPress={() => handleProductClick(item._id)}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
      </Pressable>

      <View style={styles.wrapper}>
        <View style={styles.infoWrapper}>
          <Text style={styles.prodTitle}>{item.title}</Text>
          <Text style={styles.price}>{item.price} {'AED'}</Text>
        </View>


        <View style={styles.actionsWrapper}>
          <Text style={styles.totalPrice}>{(item.price * cartProducts[item._id]).toFixed(2)} {'AED'}</Text>

          <View style={styles.controlsWrapper}>
            <Pressable style={styles.quantityButton} onPress={handleDecreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantityText}>{cartProducts[item._id]}</Text>

            <Pressable style={styles.quantityButton} onPress={handleIncreaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>

          </View>

        </View>
      
      </View>

      {/* <Pressable style={styles.removeButton} onPress={handleRemoveItem}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 22,
    marginVertical: 8,
    width: '100%', // Full width minus margins
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    ...Shadows.primary,
  },
  detailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 16,
  },
  wrapper:{
    
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:16,
  },
  controlsWrapper:{
    alignItems:'center',
    flexDirection:'row',
  },
  prodTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsWrapper: {
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    padding: 1,
    marginHorizontal: 4,
    height:35,
    aspectRatio:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginRight:16
  },
  removeButton: {
    marginLeft: 16,
    padding: 8,
  },
  removeButtonText: {
    fontSize: 14,
    color: Colors.light.danger,
  },
});

export default CartItemCard;
