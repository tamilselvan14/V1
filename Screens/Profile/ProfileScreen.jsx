import React, { useState } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";

const ProfileScreen = (props) => {
  const [activeTab, setActiveTab] = useState("Information");

  const tabs = ["Information", "Thoughts", "Community", "Vibes"];

  const[ menuVisible, setMenuVisible]= useState(false);
        const toggleMenu = () => {
          setMenuVisible(!menuVisible);
        };
      
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.username}>modern_monk</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuDot}>☰</Text>
        </TouchableOpacity>
      </View>

            
    
   
    {(
      <Modal
        transparent={true}
        animationType="fade"
        visible={menuVisible}
        onRequestClose={toggleMenu}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={styles.menuContainer} >
            <TouchableOpacity style={styles.menuItem} onPress={()=> { toggleMenu(); props.navigation.navigate('EditProfile');}}>
              <Text style={styles.menuText}>Edit Profile</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )}
  

         

     
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/welcome.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>0</Text>
            <Text style={styles.statsLabel}>Posts</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>0</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>0</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.navSection}>
        <TouchableOpacity>
          <Text style={styles.navText}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs Selection */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Image
          source={{
            uri: "https://via.placeholder.com/200", // Placeholder central image
          }}
          style={styles.placeholderImage}
        />
        <Text style={styles.noPostText}>No Post Yet</Text>
        <Text style={styles.noPostSubText}>
          All your posts will appear here after uploading.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 10,
  },
  menuDot: {
    fontSize: 18,
    color: "#555",
  },
  profileSection: {
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  statsBox: {
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statsLabel: {
    fontSize: 12,
    color: "#888",
  },
  navSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  navText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  tabButton: {
    paddingBottom: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50", // Active tab underline
  },
  tabText: {
    fontSize: 14,
    color: "#777",
  },
  activeTabText: {
    color: "#4CAF50", // Active tab text color
    fontWeight: "bold",
  },
  contentSection: {
    alignItems: "center",
    marginTop: 20,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noPostText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  noPostSubText: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  menuContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: 200,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ProfileScreen;