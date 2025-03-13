import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid, FlatList, TouchableOpacity, Image, Text, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DRAFT_STORAGE_KEY = 'richTextDraft'; // Key for storing the draft in AsyncStorage

const PostScreen = () => {
  const richText = useRef(null); // Reference for the RichEditor
  const [content, setContent] = useState('');
  const [mediaItems, setMediaItems] = useState([]); // Store selected media items
  const [postType, setPostType] = useState('Global Post'); // Selected post type
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

  // Load the draft content when the component mounts
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const savedDraft = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          setContent(savedDraft);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load draft content.');
      }
    };

    loadDraft();
  }, []);

  // Save the content as draft
  const saveDraft = async (draftContent) => {
    try {
      await AsyncStorage.setItem(DRAFT_STORAGE_KEY, draftContent);
    } catch (error) {
      Alert.alert('Error', 'Failed to save draft content.');
    }
  };

  // Handle saving the current content
  const handleSave = () => {
    richText.current?.getContentHtml().then((contentHtml) => {
      console.log('Content:', contentHtml); // Logs the HTML content
      Alert.alert('Content Saved', 'Your content has been saved successfully.');
    });
  };

  // Handle image or video from the camera
  const handleCameraAccess = async (mediaType) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app requires access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Denied', 'Camera access is required to use this feature.');
      return;
    }

    launchCamera(
      {
        mediaType: mediaType,
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setMediaItems((prevItems) => [...prevItems, { uri }]);
          if (mediaType === 'photo') richText.current?.insertImage(uri);
        }
      }
    );
  };

  // Handle image from the gallery
  const handleGalleryAccess = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled gallery picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setMediaItems((prevItems) => [...prevItems, { uri }]);
          richText.current?.insertImage(uri);
        }
      }
    );
  };

  // Handle location access
  const handleLocationAccess = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Denied', 'Location access is required to use this feature.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const locationText = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        richText.current?.insertText(locationText);
      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Render dropdown options
  const renderDropdown = () => (
    <Modal
      transparent={true}
      visible={isDropdownVisible}
      animationType="fade"
      onRequestClose={() => setDropdownVisible(false)}
    >
      <Pressable style={styles.dropdownOverlay} onPress={() => setDropdownVisible(false)}>
        <View style={styles.dropdownContainer}>
          {['Global Post', 'Community Post', 'Follower Post', 'Anonymous Post'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => {
                setPostType(type);
                setDropdownVisible(false);
              }}
              style={styles.dropdownItem}
            >
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Rich Editor */}
      <RichEditor
        ref={richText}
        style={styles.richEditor}
        placeholder="What's on your mind?..."
        initialHeight={200}
        initialContentHTML={content} // Load the saved draft content
        onChange={(text) => saveDraft(text)} // Save draft on content change
      />

      {/* Rich Toolbar */}
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.alignLeft,
          actions.alignCenter,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.blockquote,
          actions.insertLink,
          actions.removeFormat,
        ]}
        iconTint="#000"
        selectedIconTint="#2096F3"
        selectedButtonStyle={styles.selectedButton}
      />

      {/* Action Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleCameraAccess('photo')}>
          <Icon name="camera-alt" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCameraAccess('video')}>
          <Icon name="videocam" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGalleryAccess}>
          <Icon name="photo-library" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLocationAccess}>
          <Icon name="location-on" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDropdownVisible(true)}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      {renderDropdown()}

      {/* Media Preview */}
      <FlatList
        data={mediaItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.mediaItem} />
        )}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}
      />

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={handleSave}>
        <Text style={styles.postButtonText}>{postType}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  richEditor: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#e0f7fa',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  mediaItem: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  postButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2096F3',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PostScreen;


