import React from 'react';
import { View,Image, Text, StyleSheet, Button } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
                style={styles.logo}
                source={require('../../assets/welcome.jpg')}
              />
      <Text style={styles.title}>Welcome to Vibein</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};



export default Welcome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
      
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#0163d2',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    registerLink: {
      color: '#0163d2',
      marginTop: 10,
    },
  });
