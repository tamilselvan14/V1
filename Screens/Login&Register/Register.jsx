import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendRequestToMiddleware } from '../../middleware/frontendAgent';


console.log("🔍 sendRequestToMiddleware exists:", typeof sendRequestToMiddleware);


function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    if (!name || !mobile || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    console.log("📤 Sending request to middleware...", { name, mobile, password });

    try {
      const response = await sendRequestToMiddleware("registerUser", { name, mobile, password });
      
      console.log("📥 Response from middleware:", response);

      if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        Alert.alert("Success", response.message || "Registered successfully!");
        navigation.navigate("Login"); // ✅ Navigate to Login after success
      }
    } catch (error) {
      console.error("❌ Registration request failed:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/mainLogo.png')} />
      <Text style={styles.header}>Register</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  logo: { width: 150, height: 150, marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  registerLink: { color: '#0163d2', marginTop: 10 },
});

export default RegisterScreen;
