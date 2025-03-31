import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';

const CommunityCreateScreen = ({ navigation }) => {
  const [communityName, setCommunityName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [communityType, setCommunityType] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [categories, setCategories] = useState([]); // Categories from DB
  const [subCategories, setSubCategories] = useState([]); // Subcategories from DB
  const [filteredCategories, setFilteredCategories] = useState([]); // Filtered categories for dropdown
  const [filteredSubCategories, setFilteredSubCategories] = useState([]); // Filtered subcategories for dropdown
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // Show/hide category dropdown
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false); // Show/hide subcategory dropdown

  // Simulate fetching categories and subcategories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = ['Technology', 'Health', 'Education'];
      const fetchedSubCategories = ['AI', 'Fitness', 'Online Courses'];
      setCategories(fetchedCategories);
      setSubCategories(fetchedSubCategories);
    };

    fetchCategories();
  }, []);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleCreateCommunity = () => {
    if (!communityName || !category || !subCategory || !communityType || !description) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const communityData = {
      communityName,
      category,
      subCategory,
      communityType,
      description,
      profileImage,
    };

    console.log('Community Data:', communityData);
    Alert.alert('Success', 'Community Created Successfully');
    navigation.navigate('NextScreen', { communityData }); // Replace 'NextScreen' with the actual screen name
  };

  const handleCategoryChange = (text) => {
    setCategory(text);
    if (text.length > 0) {
      const filtered = categories.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowCategoryDropdown(filtered.length > 0); // Show dropdown only if there are matches
    } else {
      setShowCategoryDropdown(false);
    }
  };

  const handleSubCategoryChange = (text) => {
    setSubCategory(text);
    if (text.length > 0) {
      const filtered = subCategories.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSubCategories(filtered);
      setShowSubCategoryDropdown(filtered.length > 0); // Show dropdown only if there are matches
    } else {
      setShowSubCategoryDropdown(false);
    }
  };

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setShowCategoryDropdown(false);
      Alert.alert('Success', `Category "${category}" created!`);
    }
  };

  const handleAddSubCategory = () => {
    if (subCategory && !subCategories.includes(subCategory)) {
      setSubCategories([...subCategories, subCategory]);
      setShowSubCategoryDropdown(false);
      Alert.alert('Success', `Subcategory "${subCategory}" created!`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={handleImagePick} style={styles.profileContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/welcome.jpg')}
          style={styles.profileImage}
        />
        <Icon name="edit" size={24} color="#fff" style={styles.editIcon} />
      </TouchableOpacity>

      {/* Community Name */}
      <TextInput
        style={styles.input}
        placeholder="Community Name"
        value={communityName}
        onChangeText={setCommunityName}
      />

      {/* Category Input */}
      <View style={styles.inputWithButton}>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={handleCategoryChange}
        />
        {category && !categories.includes(category) && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
            <Text style={styles.addButtonText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
      {showCategoryDropdown && (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setCategory(item);
                setShowCategoryDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {/* Subcategory Input */}
      <View style={styles.inputWithButton}>
        <TextInput
          style={styles.input}
          placeholder="Subcategory"
          value={subCategory}
          onChangeText={handleSubCategoryChange}
        />
        {subCategory && !subCategories.includes(subCategory) && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddSubCategory}>
            <Text style={styles.addButtonText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
      {showSubCategoryDropdown && (
        <FlatList
          data={filteredSubCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setSubCategory(item);
                setShowSubCategoryDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {/* Community Type */}
      <TextInput
        style={styles.input}
        placeholder="Community Type (e.g., Open, Private, Closed)"
        value={communityType}
        onChangeText={setCommunityType}
      />

      {/* Description */}
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Create Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateCommunity}>
        <Text style={styles.createButtonText}>Create Community</Text>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10, // Horizontal padding for better spacing
    paddingVertical: 5, // Reduced vertical padding to remove extra space
    fontSize: 14, // Reduced font size
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    height: 40, // Fixed height for smaller input boxes
    textAlignVertical: 'center', // Align text vertically in the center
  },
  // input: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 8, // Reduced padding
  //   fontSize: 14, // Reduced font size
  //   backgroundColor: '#f9f9f9',
  //   marginBottom: 15,
  //   height: 40, // Set a smaller height
  // },
  // input: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 10,
  //   fontSize: 16,
  //   backgroundColor: '#f9f9f9',
  // },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 150,
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CommunityCreateScreen;

// input: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 8,
//   padding: 10,
//   fontSize: 16,
//   backgroundColor: '#f9f9f9',
//   marginBottom: 15,
// },

