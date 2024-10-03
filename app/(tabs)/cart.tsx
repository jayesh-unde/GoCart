// cart.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute, RouteProp } from 'expo-router';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartScreenRouteProp = RouteProp<{ params: { cart: CartItem[] } }, 'params'>;

export default function CartScreen() {
  const route = useRoute<CartScreenRouteProp>();
  const { cart } = route.params;

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
    </View>
  );

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
          </View>
        )}
      />
      <View style={styles.checkoutButton}>
        <Button title="Proceed to Checkout" onPress={() => alert('Proceeding to checkout')} />
      </View>
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
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
