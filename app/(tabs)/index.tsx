import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const itemsData = [
  { id: '1', name: 'LadyFinger', image: 'https://via.placeholder.com/150', price: 100 },
  { id: '2', name: 'Cabbage', image: 'https://via.placeholder.com/150', price: 150 },
  { id: '3', name: 'Onion', image: 'https://via.placeholder.com/150', price: 200 },
];

export default function ItemListScreen() {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* Cart Icon */}
      <Pressable
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart', { cart })}
      >
        <FontAwesome name="shopping-cart" size={28} color="black" />
        {cart.length > 0 && <Text style={styles.cartItemCount}>{cart.length}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  cartButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemCount: {
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
