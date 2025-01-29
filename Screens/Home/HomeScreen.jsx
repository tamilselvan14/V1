import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [feed, setFeed] = useState([
    {
      id: '1',
      userName: 'John Doe',
      userAvatar: 'https://www.w3schools.com/w3images/avatar2.png',
      postText: 'Just started learning React Native! #excited',
      time: '2 hours ago',
      likes: 120,
      comments: 8,
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userAvatar: 'https://www.w3schools.com/w3images/avatar5.png',
      postText: 'This app is amazing! #ReactNative #MobileDevelopment',
      time: '4 hours ago',
      likes: 50,
      comments: 15,
    },
    {
      id: '3',
      userName: 'Samuel Lee',
      userAvatar: 'https://www.w3schools.com/w3images/avatar1.png',
      postText: 'Can’t wait to build my first app with React Native!',
      time: '1 day ago',
      likes: 85,
      comments: 5,
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.postText}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Like {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Comment {item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate('PostScreen')}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  postText: {
    marginTop: 10,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#1DA1F2', // Twitter blue color
  },
  postButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1DA1F2', // Twitter blue color
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default HomeScreen;
