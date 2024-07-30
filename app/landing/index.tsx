import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ListRenderItem, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { addToCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';
import { navigate } from '@/router/Route';
import { Shadows } from '@/constants/Shadows';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  title: string;
  description: string;
  rating: string;
  image: string;
  price: number;
  _id: string;
}

interface Response {
  [key: string]: any;
}

const PAGE_SIZE = 10;
const screenWidth = Dimensions.get('window').width;

const LandingScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = async (pageNumber: number): Promise<void> => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products?page=${pageNumber}&size=${PAGE_SIZE}`);
      const resData: Response = await response.json();

      if (resData?.data?.length < PAGE_SIZE) {
        setHasMore(false);
      }

      const newProducts = [...products, ...resData?.data];
      setProducts(newProducts);
      setFilteredProducts(newProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = (): void => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, products]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item})=><ProductCard item={item}/>}
          keyExtractor={(item, idx) => item._id.toString() + idx}
          numColumns={2}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 16,
    paddingBottom:0,
    marginBottom:0,
    position:'absolute',
    zIndex:1,
    backgroundColor:Colors.light.background,
    width:(screenWidth) - 32,
  },
  image: {
    width: (screenWidth / 3) - 32,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: Colors.light.background,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
    maxWidth: (screenWidth / 2) - 24,
    ...Shadows.primary,

  },
  detailsWrapper: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 4,
    justifyContent: 'space-between',
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    marginTop: 66,
    paddingBottom: 140,
  },
  addButton: {
    backgroundColor: Colors.light.secondary,
    padding: 5,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  prodTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
});
