import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';

const UserScreen = (props) => {
  const gridData = [
    { id: '1', name: 'Item 1', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
    { id: '2', name: 'Item 2', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
    { id: '3', name: 'Item 3', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
    { id: '4', name: 'Item 4', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
    { id: '5', name: 'Item 5', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
    { id: '6', name: 'Item 6', image: require('/Users/tamilselvan/V1/assets/mainLogo.png') },
  ];

  const renderGridItem = ({ item, navigation }) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={()=> props.navigation.navigate('C1', {name: item.name, image:item.image})}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={gridData}
      renderItem={renderGridItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 10,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserScreen;
