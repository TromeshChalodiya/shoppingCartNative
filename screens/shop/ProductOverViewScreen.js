import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductOverViewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductOverViewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
