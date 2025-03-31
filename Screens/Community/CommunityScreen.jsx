import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const CommunityScreen = (props) => {
  const gridData = [
    { id: '1', name: 'Item 1', image: require('../../assets/mainLogo.png') },
    { id: '2', name: 'Item 2', image: require('../../assets/mainLogo.png') },
    { id: '3', name: 'Item 3', image: require('../../assets/mainLogo.png') },
    { id: '4', name: 'Item 4', image: require('../../assets/mainLogo.png') },
    { id: '5', name: 'Item 5', image: require('../../assets/mainLogo.png') },
    { id: '6', name: 'Item 6', image: require('../../assets/mainLogo.png') },
  ];

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => props.navigation.navigate('C1', { name: item.name, image: item.image })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Communities</Text>
      <Text style={styles.subtitle}>Explore and join your favorite communities</Text>

      {/* Grid List */}
      <FlatList
        data={gridData}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => props.navigation.navigate('CommunityCreateScreen')}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommunityScreen;
