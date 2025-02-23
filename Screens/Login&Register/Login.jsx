import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendRequestToMiddleware } from '../../middleware/frontendAgent'; // ✅ Import API function

function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    if (!mobile || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    console.log("📤 Sending login request...", { mobile, password });

    try {
      const response = await sendRequestToMiddleware("loginUser", { mobile, password });

      console.log("📥 Response from middleware:", response);

      if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        Alert.alert("Success", response.message || "Login successful!");
        navigation.navigate("AppBar"); // ✅ Navigate on success
      }
    } catch (error) {
      console.error("❌ Login request failed:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./mainLogo.png')} />
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ padding: 10, alignItems: 'flex-end' }}>
        <Text style={{ color: "#420475", fontWeight: '700' }}>Forgot Password</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don’t have an account? Register</Text>
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

export default LoginPage;
