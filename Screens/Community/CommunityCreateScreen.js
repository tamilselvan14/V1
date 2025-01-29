import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommunityCreateScreen = () => {
  const [communityName, setCommunityName] = useState('');
  const [communityType, setCommunityType] = useState('open');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateCommunity = () => {
    console.log({
      communityName,
      communityType,
      description,
      link,
      location,
    });
    // Add logic to save the community
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Community</Text>
      <TextInput
        style={styles.input}
        placeholder="Community Name"
        value={communityName}
        onChangeText={setCommunityName}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={communityType}
          onValueChange={(itemValue) => setCommunityType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Open" value="open" />
          <Picker.Item label="Private" value="private" />
          <Picker.Item label="Closed" value="closed" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={link}
        onChangeText={setLink}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateCommunity}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunityCreateScreen;
