import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, ''); // Allow only numbers
    setPhoneNumber(numericText);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const validateAndProceed = () => {
    if (phoneNumber.length === 10 && password.length >= 6) {
      alert(`Phone: +91${phoneNumber}, Password: ${password}`);
    } else {
      alert('Please enter a valid 10-digit phone number and a password with at least 6 characters.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Transparent Image */}
      <Image
        source={require('../../assets/transparent.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Welcome to Vibein</Text>
      <Text style={styles.subtitle}>Login with Password</Text>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
          >
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'} // Change icon based on visibility
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={validateAndProceed}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.passwordButton}
              onPress={() => navigation.navigate('PasswordLoginScreen')}
            >
              <Text style={styles.passwordButtonText}>Register with Password</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
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
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default PasswordLoginScreen;
