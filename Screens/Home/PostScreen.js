
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const audioRecorderPlayer = new AudioRecorderPlayer();

const PostScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('information'); // Active tab state
  const [content, setContent] = useState(''); // Content state for the post
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false); // Link input visibility
  const [link, setLink] = useState(''); // Link state
  const [menuVisible, setMenuVisible] = useState(false);
  const [audioFile, setAudioFile] = useState(null); // Audio file state
  const [isRecording, setIsRecording] = useState(false); // Recording state
  const [isPlaying, setIsPlaying] = useState(false); // Audio playing state
  const [recording, setRecording] = useState(null); // Recording instance
  const [sound, setSound] = useState(null); // Sound instance for playback
  const [postType, setpostType] = useState('Global'); // Selected menu option
  const [communities, setCommunities] = useState(['Community 1', 'Community 2', 'Community 3']); // List of communities
  const [showCommunityList, setShowCommunityList] = useState(false); // Community list visibility
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [location, setLocation] = useState(null);
  


  const pickMedia = async () => {
    const options = {
        mediaType: 'mixed', // Allows both images and videos
        quality: 1,         // Maximum quality
        includeBase64: false,
    };

    launchImageLibrary(options, response => {
        if (response.didCancel) {
            console.log('User cancelled media picker');
        } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else {
            const asset = response.assets[0]; // Get selected file
            if (asset.type.startsWith('image/')) {
                setImageUri(asset.uri);
                setVideoUri(null); // Clear video if image is selected
            } else if (asset.type.startsWith('video/')) {
                setVideoUri(asset.uri);
                setImageUri(null); // Clear image if video is selected
            }
        }
    });
};


  

  const getLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        error => {
            console.error(error);
            Alert.alert('Error', 'Failed to get location.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};


  const handleStartRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setAudioFile(result);
      setIsRecording(false);
      console.log('Recording stopped, file saved at:', result);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const handlePlayPauseAudio = async () => {
    try {
      if (isPlaying) {
        await audioRecorderPlayer.stopPlayer();
        setIsPlaying(false);
        console.log('Audio paused');
      } else {
        await audioRecorderPlayer.startPlayer(audioFile);
        setIsPlaying(true);
        console.log('Audio playing');
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error);
    }
  };

  const handleDeleteAudio = () => {
    setAudioFile(null);
    setIsPlaying(false);
    console.log('Audio deleted');
  };
  const handleMenuOptionSelect = (option) => {
    setpostType(option);
    setMenuVisible(false);

    if (option === 'Community') {
      setShowCommunityList(true);
    } else {
      setShowCommunityList(false);
    }
  };

  // // http://localhost:8080/api/posts

  // const handlePost = async () => {
  //   if (!content && !link) {
  //     Alert.alert('Error', 'Either content or a link is required before posting.');
  //     return;
  //   }
  
  //   try {
  //     let postData;
  //     let headers = {
  //       Accept: 'application/json',
  //     };
  
  //     if (audioFile) {
  //       // If there's an audio file, use FormData (multipart request)
  //       postData = new FormData();
  //       if (content) postData.append('content', content);
  //       if (link) postData.append('link', link);
        
  //       const fileUri = audioFile.startsWith('file://') ? audioFile : `file://${audioFile}`;
  //       postData.append('audio', {
  //         uri: fileUri,
  //         type: 'audio/mpeg', // Change MIME type if needed
  //         name: 'audio.mp3',
  //       });
  
  //       headers['Content-Type'] = 'multipart/form-data';
  //     } else {
  //       // If there's no audio, send JSON request
  //       postData = JSON.stringify({
  //         content: content || '',
  //         link: link || '',
  //       });
  
  //       headers['Content-Type'] = 'application/json';
  //     }
  
  //     const response = await axios.post('http://localhost:8080/api/posts', postData, { headers });
  
  //     if (response.status === 201) {
  //       Alert.alert('Success', 'Post created successfully!');
  //       navigation.goBack();
  //     } else {
  //       Alert.alert('Error', `Failed to create post. Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Error creating post:', error.response?.data || error.message);
  //     Alert.alert('Error', `Server response: ${JSON.stringify(error.response?.data) || 'An error occurred'}`);
  //   }
  // };
  
  const handlePost = async () => {
    if (!content && !imageUri && !videoUri && !location && !audioFile && !link && !postType) {
      Alert.alert('Error', 'You must provide at least one of the required fields.');
      return;
    }

    try {
        let postData;
        let headers = {
            Accept: 'application/json',
        };

        // Common fields
        const userId = "123456"; // Replace with actual logged-in user ID
        const dateTime = new Date().toISOString(); // Get current date-time

        if (audioFile || imageUri || videoUri) {
            // Use FormData for file uploads
            postData = new FormData();
            postData.append('contentType', activeTab); // Information/Thoughts
            postData.append('userId', userId);
            postData.append('dateTime', dateTime);

            if (content) postData.append('content', content);
            if (link) postData.append('link', link);
            if (location) postData.append('location', location);
            if (postType) postData.append('postType', postType);
            if (communityName && postType === 'Community') postData.append('communityName', communityName);

            // Handling File Uploads
            if (audioFile) {
                const fileUri = audioFile.startsWith('file://') ? audioFile : `file://${audioFile}`;
                postData.append('audio', {
                    uri: fileUri,
                    type: 'audio/mpeg',
                    name: 'audio.mp3',
                });
            }
            if (imageUri) {
                postData.append('image', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                });
            }
            if (videoUri) {
                postData.append('video', {
                    uri: videoUri,
                    type: 'video/mp4',
                    name: 'video.mp4',
                });
            }

            headers['Content-Type'] = 'multipart/form-data';
        } else {
            // JSON request when no file upload is needed
            postData = JSON.stringify({
                contentType: activeTab,
                userId,
                dateTime,
                content: content || '',
                link: link || '',
                location: location || '',
                postType: postType || '',
                communityName: postType === 'Community' ? communityName : '',
            });

            headers['Content-Type'] = 'application/json';
        }

        const response = await axios.post('http://localhost:8080/api/posts', postData, { headers });

        if (response.status === 201) {
            Alert.alert('Success', 'Post created successfully!');
            navigation.goBack();
        } else {
            Alert.alert('Error', `Failed to create post. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        Alert.alert('Error', `Server response: ${JSON.stringify(error.response?.data) || 'An error occurred'}`);
    }
};

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create a Post</Text>
      <Text style={styles.subtitle}>Share your thoughts with the world</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'information' && styles.activeTab]}
          onPress={() => setActiveTab('information')}
        >
          <Text style={[styles.tabText, activeTab === 'information' && styles.activeTabText]}>
            INFORMATION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'thoughts' && styles.activeTab]}
          onPress={() => setActiveTab('thoughts')}
        >
          <Text style={[styles.tabText, activeTab === 'thoughts' && styles.activeTabText]}>
            Thoughts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      {activeTab === 'information' ? (
        <TextInput
          style={styles.contentInput}
          placeholder="Write information here..."
          multiline
          value={content}
          onChangeText={setContent}
        />
      ) : (
        <TextInput
          style={styles.contentInput}
          placeholder="Share your thoughts here..."
          multiline
          value={content}
          onChangeText={setContent}
        />
      )}

      {/* Media and Actions */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={pickMedia}>
          <Feather name="image" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={getLocation}>
        
          <Feather name="map-pin" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Feather name={isRecording ? 'square' : 'mic'} size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLinkInputVisible(!isLinkInputVisible)}>
          <Feather name="link" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Link Input */}
      {isLinkInputVisible && (
        <TextInput
          style={styles.linkInput}
          placeholder="Enter a link..."
          value={link}
          onChangeText={setLink}
          onSubmitEditing={() => {
            setIsLinkInputVisible(false);
            console.log('Link added:', link);
          }}
        />
      )}

      {/* Audio File UI */}
      {audioFile && (
        <View style={styles.audioContainer}>
          <TouchableOpacity onPress={handlePlayPauseAudio}>
            <Text style={styles.audioButton}>
              {isPlaying ? 'Pause Audio' : 'Play Audio'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAudio}>
            <Text style={styles.audioButton}>Delete Audio</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Post Button */}
      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>{postType} Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuIcon}>
          <Feather name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOptionSelect('Global')}
          >
            <Text style={styles.menuText}>Global</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOptionSelect('Anonymous')}
          >
            <Text style={styles.menuText}>Anonymous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOptionSelect('Friends')}
          >
            <Text style={styles.menuText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOptionSelect('Community')}
          >
            <Text style={styles.menuText}>Community</Text>
          </TouchableOpacity>
        </View>
      )}
      {showCommunityList && (
        <FlatList
          data={communities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.communityItem}>
              <Text style={styles.communityText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.communityList}
        />
      )}
      {/* <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  linkInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  audioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  audioButton: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  menu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  communityList: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  communityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  communityText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PostScreen;
