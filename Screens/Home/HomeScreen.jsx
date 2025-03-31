
import React, { useState , useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const filters = ["Global", "Followers", "Anonymous", "Community"];

  

  const HomeScreen = () => {
  const navigation = useNavigation(); 
  const [selectedFilter, setSelectedFilter] = useState("Global");
  const [posts, setPosts] = useState([
    {
      id: '1',
      userProfile: 'https://via.placeholder.com/50',
      userName: 'John Doe',
      postDate: '2023-09-15 10:30 AM',
      content: 'This is a sample post with text content.',
      image: 'https://via.placeholder.com/300',
      audio: null,
      link: 'https://example.com',
      location: 'New York, USA',
      likes: 10,
      comments: 5,
      Vibed: 2,
    },
    {
      id: '2',
      userProfile: 'https://via.placeholder.com/50',
      userName: 'Jane Smith',
      postDate: '2023-09-14 5:00 PM',
      content: 'Another post with an audio file.',
      image: null,
      audio: 'https://example.com/audio.mp3',
      link: null,
      location: null,
      likes: 25,
      comments: 8,
      Vibed: 3,
    },
  ]);
  const API_ENDPOINTS = {
    Global: "http://localhost:8080/api/posts/global",
    Followers: "http://localhost:8080/api/posts/followers",
    Anonymous: "http://localhost:8080/api/posts/anonymous",
    Community: "http://localhost:8080/api/posts/community",
  };

  // Fetch posts whenever the selected filter changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS[selectedFilter]);
        setPosts(response.data); // Update state with fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedFilter]); 
 
  
    const menuRef = useRef(null);
    const [visible, setVisible] = useState(false);
  
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
  
    const handleMenuOption = async (option) => {
      hideMenu(); // Hide menu after selection
      try {
        let response;
        switch (option) {
          case 'Pin':
            response = await axios.post(`http://localhost:8080/api/posts/${postId}/pin`);
            console.log(`Post ${postId} pinned successfully.`);
            break;
  
          case 'Block':
            response = await axios.post(`http://localhost:8080/api/users/block`, { postId });
            console.log(`User blocked for post ${postId}.`);
            break;
  
          case 'Report':
            response = await axios.post(`http://localhost:8080/api/posts/${postId}/report`);
            console.log(`Post ${postId} reported.`);
            break;
  
          default:
            console.error('Invalid option selected');
        }
      } catch (error) {
        console.error(`Error handling ${option}:`, error.response?.data || error.message);
      }
    };

  const handleLike = (postId) => {
    Alert.alert('Like', `You liked post ${postId}.`);
  };

  const handleComment = (postId) => {
    Alert.alert('Comment', `You commented on post ${postId}.`);
  };

  const handleVibed = (postId) => {
    Alert.alert('Vibed', `You Vibed post ${postId}.`);
  };

  const handleShare = (postId) => {
    Alert.alert('Share', `You shared post ${postId}.`);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: item.userProfile }} style={styles.userProfile} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.postDate}>{item.postDate}</Text>
        </View>
        <View style={styles.menuContainer}>
      <Menu
        ref={menuRef}
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Feather name="more-vertical" size={20} color="black" />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => handleMenuOption('Pin')}>📌 Pin</MenuItem>
        <MenuItem onPress={() => handleMenuOption('Block')}>🚫 Block</MenuItem>
        <MenuItem onPress={() => handleMenuOption('Report')}>⚠️ Report</MenuItem>
      </Menu>
    </View>

        {/* <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => Alert.alert('Menu', 'Options: Pin, Block, Report')}
        >
          <Feather name="more-vertical" size={20} color="#666" />
        </TouchableOpacity> */}
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Media (Image/Video) */}
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}

      {/* Audio File */}
      {item.audio && (
        <TouchableOpacity
          style={styles.audioButton}
          onPress={() => Alert.alert('Audio', 'Play audio functionality here')}
        >
          <Text style={styles.audioButtonText}>Play Audio</Text>
        </TouchableOpacity>
      )}

      {/* Link */}
      {item.link && (
        <Text style={styles.postLink} onPress={() => Alert.alert('Link', item.link)}>
          {item.link}
        </Text>
      )}

      {/* Location */}
      {item.location && (
        <Text style={styles.postLocation}>
          <Feather name="map-pin" size={14} color="#666" /> {item.location}
        </Text>
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Feather name="thumbs-up" size={20} color="#4CAF50" />
          <Text style={styles.actionText}>{item.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComment(item.id)}>
          <Feather name="message-circle" size={20} color="#4CAF50" />
          <Text style={styles.actionText}>{item.comments} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleVibed(item.id)}>
          <Feather name="repeat" size={20} color="#4CAF50" />
          <Text style={styles.actionText}>{item.Vibed} Vibed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(item.id)}>
          <Feather name="share" size={20} color="#4CAF50" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
  

    {/* Filters */}
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.activeFilter,
          ]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter && styles.activeFilterText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

   


      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.postsList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("PostScreen")}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  filters: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#666',
  },
  postsList: {
    paddingBottom: 20,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  menuIcon: {
    padding: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  audioButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  postLink: {
    fontSize: 14,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  postLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
});

export default HomeScreen;
