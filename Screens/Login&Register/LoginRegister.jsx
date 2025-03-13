import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const validateAndProceed = () => {
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
    } else {
      navigation.navigate('OTPScreen', { phoneNumber });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../../assets/transparent.png')} style={styles.image} />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Vibein</Text>
        <Text style={styles.subtitle}>Beyond imagination</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Enter Phone Number' 
            keyboardType='phone-pad' 
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={validateAndProceed}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <Text style={styles.terms}>By continuing, you agree to our</Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://vibein.in/terms')}>
              <Text style={styles.linkText}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> | </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://vibein.in/privacy')}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> | </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://vibein.in/content')}>
              <Text style={styles.linkText}>Content Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'darkgreen',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  prefix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkgreen',
    paddingRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  terms: {
    fontSize: 12,
    color: 'gray',
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  linkText: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: 12,
    color: 'gray',
  },
});

export default LoginScreen;
