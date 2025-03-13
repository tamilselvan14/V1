import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const filters = ["Global", "Followers", "Anonymous", "Community"];

const posts = [
  { id: "1", user: "Anonymous_VBU4", time: "1 month ago", content: "Anonymous post test", likes: 0, dislikes: 0, comments: [{ id: "c1", text: "Nice post!" }] },
  { id: "2", user: "GAMERS", time: "1 month ago", content: "Community post", likes: 0, dislikes: 0, comments: [{ id: "c2", text: "Interesting thoughts." }] },
];

const HomeScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("Global");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Avatar.Text size={40} label={item.user.charAt(0)} />
              <View style={styles.postInfo}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
              <TouchableOpacity onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}>
                <Feather name="more-vertical" size={20} />
              </TouchableOpacity>
            </View>
            
            {menuVisible === item.id && (
              <View style={styles.menu}>
                <TouchableOpacity><Text>📌 Pin</Text></TouchableOpacity>
                <TouchableOpacity><Text>👥 Follow/Unfollow</Text></TouchableOpacity>
                <TouchableOpacity><Text>🚩 Report</Text></TouchableOpacity>
                <TouchableOpacity><Text>🚫 Block</Text></TouchableOpacity>
              </View>
            )}

            <Text style={styles.postContent}>{item.content}</Text>
            
            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <AntDesign name="like2" size={18} color="green" />
                <Text>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <AntDesign name="dislike2" size={18} color="red" />
                <Text>{item.dislikes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => { setSelectedComments(item.comments); setModalVisible(true); }}>
                <Feather name="message-circle" size={18} color="black" />
                <Text>{item.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="repeat" size={18} color="green" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="share" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("PostScreen")}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Comment Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            {selectedComments.map((comment) => (
              <Text key={comment.id} style={styles.commentText}>{comment.text}</Text>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  filterContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  filterButton: { padding: 8, borderRadius: 20, backgroundColor: "#ddd" },
  activeFilter: { backgroundColor: "#28a745" },
  filterText: { color: "black" },
  activeFilterText: { color: "white" },
  postCard: { backgroundColor: "white", padding: 10, borderRadius: 10, marginBottom: 10 },
  postHeader: { flexDirection: "row", alignItems: "center" },
  postInfo: { marginLeft: 10 },
  userName: { fontWeight: "bold" },
  postTime: { color: "gray" },
  postContent: { marginVertical: 10 },
  actionsContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 5 },
  actionButton: { flexDirection: "row", alignItems: "center", padding: 5 },
  menu: { backgroundColor: "white", padding: 10, borderRadius: 5, position: "absolute", right: 10, top: 40, elevation: 3 },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#28a745", padding: 15, borderRadius: 50 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  commentText: { marginVertical: 5, fontSize: 16 },
  modalClose: { marginTop: 10, color: "blue" }
});

export default HomeScreen;
