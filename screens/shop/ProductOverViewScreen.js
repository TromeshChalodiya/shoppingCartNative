import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: 'ProductDetail',
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            });
          }}
          onAddToCart={() => {}}
          onSelect={() => {
            props.navigation.navigate('ProductDetail');
          }}
        />
      )}
    />
  );
};

ProductOverViewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
