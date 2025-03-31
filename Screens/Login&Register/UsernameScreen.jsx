

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const UsernameScreen = () => {
//   const [username, setUsername] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [genderOptions, setGenderOptions] = useState([
//     { label: 'Male', value: 'male' },
//     { label: 'Female', value: 'female' },
//     { label: 'Not Preferred to Say', value: 'not_specified' }
//   ]);
//   const navigation = useNavigation();

  // const handleNext = () => {
  //   navigation.navigate('AppBar');
  // };

  // const handleDobChange = (text) => {
  //   let formatted = text.replace(/\D/g, "");
  //   if (formatted.length > 2) formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
  //   if (formatted.length > 5) formatted = formatted.slice(0, 5) + "/" + formatted.slice(5, 10);
  //   setDob(formatted);
  // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Your Account</Text>

//       {/* Username Field */}
//       <Text style={styles.label}>Name</Text>
//       <TextInput
//         style={styles.input}
//         value={username}
//         onChangeText={setUsername}
//         placeholder="Enter your name"
//       />

//       {/* Gender Dropdown */}
//       <Text style={styles.label}>Gender</Text>
//       <DropDownPicker
//         open={open}
//         value={gender}
//         items={genderOptions}
//         setOpen={setOpen}
//         setValue={setGender}
//         setItems={setGenderOptions}
//         style={styles.dropdown}
//         placeholder="Select Gender"
//       />

// //       {/* DOB Field */}
//       <Text style={styles.label}>Date of Birth</Text>
//       <TextInput
//         style={styles.input}
//         value={dob}
//         onChangeText={handleDobChange}
//         placeholder="DD/MM/YYYY"
//         keyboardType="numeric"
//         maxLength={10}
//       />

//       {/* Next Button */}
//       <TouchableOpacity style={styles.button} onPress={handleNext}>
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'green',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: 'black',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'darkgreen',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: 'white',
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: 'darkgreen',
//     borderRadius: 5,
//     backgroundColor: 'white',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'darkgreen',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default UsernameScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const UsernameScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(''); // Gender state
  const [dob, setDob] = useState(new Date()); // Date of Birth state
  const [showDatePicker, setShowDatePicker] = useState(false); // Date picker visibility
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  
 
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleDobChange = (text) => {
    let formatted = text.replace(/\D/g, "");
    if (formatted.length > 2) formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0, 5) + "/" + formatted.slice(5, 10);
    setDob(formatted);
  };

  const validateAndProceed = () => {
    const [day, month, year] = dob.split('/'); // Split the dob string into day, month, and year
    const dobDate = new Date(`${year}-${month}-${day}`); // Create a valid Date object (YYYY-MM-DD format)
  
    if (username.length >= 3 && gender && dob && !isNaN(dobDate.getTime())) {
      Alert.alert('Success', `Username: ${username}, Gender: ${gender}, DoB: ${dobDate.toDateString()}`);
      navigation.navigate('AppBar'); // Navigate to the home screen or next step
    } else {
      Alert.alert('Invalid Input', 'Please fill all the fields correctly.');
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>

      {/* Gender Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>
            {gender || 'Select Gender'}
          </Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownList}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setGender('Male');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setGender('Female');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setGender('Other');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>Other</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Date of Birth Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your date of birth (DD/MM/YYYY)"
          value={dob}
          onChangeText={handleDobChange} // Use the handleDobChange function
        />
      </View>


      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={validateAndProceed}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start', // Align content to the top
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#666',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  datePickerText: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsernameScreen;
