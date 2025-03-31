import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, FlatList } from "react-native";

const CommunityProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Members");
  const [menuVisible, setMenuVisible] = useState(false);

  const tabs = ["Members", "Information", "Thoughts"];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const selectedCommunity = {
    id: "1",
    name: "Gamers",
    type: "Private",
    category: "Traveler",
    location: "Chennai",
    link: "www.communitylink.com",
    members: [
      { id: "101", name: "chikku", role: "Creator" },
      { id: "102", name: "ranjithjms", role: "Member" },
      { id: "103", name: "vibein", role: "Member" },
    ],
  };

  const getLockIcon = (type) => {
    if (type === "Public") {
      return "🔓"; // Green open lock
    } else if (type === "Private") {
      return "🔒"; // Closed green lock
    } else {
      return "🔴🔒"; // Closed red lock
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Community</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuDot}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal transparent={true} animationType="fade" visible={menuVisible} onRequestClose={toggleMenu}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Edit Community</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Share Community</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Community Info */}
      <View style={styles.communityInfo}>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.communityName}>{selectedCommunity.name}</Text>
            <Text style={styles.communityType}>{getLockIcon(selectedCommunity.type)}</Text>
          </View>
          <Text style={styles.communityCategory}>{selectedCommunity.category}</Text>
        </View>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.communityAvatar} />
      </View>

      {/* Location, Link, and Join Button */}
      <View style={styles.infoRow}>
        <Text style={styles.communityLocation}>📍 {selectedCommunity.location}</Text>
        <Text style={styles.communityLink}>🔗 {selectedCommunity.link}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs Selection */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Section */}
      {activeTab === "Members" && (
        <FlatList
          data={selectedCommunity.members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memberItem}>
              <Image source={{ uri: "https://via.placeholder.com/40" }} style={styles.memberAvatar} />
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberRole}>{item.role}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  menuDot: { fontSize: 18, color: "#555" },
  communityInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  textContainer: { flex: 1, alignItems: "flex-start" },
  communityAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#ddd" },
  joinButton: { backgroundColor: "green", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5 },
  joinButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
  communityName: { fontSize: 18, fontWeight: "bold", marginRight: 5 },
  communityType: { fontSize: 18 },
  communityCategory: { fontSize: 14, color: "#666" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  communityLocation: { fontSize: 14, color: "#666" },
  communityLink: { fontSize: 14, color: "blue", textDecorationLine: "underline" },
  tabBar: { flexDirection: "row", justifyContent: "space-around", borderBottomWidth: 1, borderBottomColor: "#ddd", marginBottom: 20 },
  tabButton: { paddingBottom: 8 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: "green" },
  tabText: { fontSize: 14, color: "#777" },
  activeTabText: { color: "green", fontWeight: "bold" },
  memberItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  memberName: { fontSize: 16, fontWeight: "bold", flex: 1 },
  memberRole: { fontSize: 14, color: "#666" }
});

export default CommunityProfileScreen;
