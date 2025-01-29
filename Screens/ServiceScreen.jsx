import React, { useState } from "react";
import { Image } from "react-native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";


const Card = ({ title, icon, colors }) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor: colors[0] }]}>
      <View style={[styles.cardHalf, { backgroundColor: colors[0] }]}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={[styles.cardHalf, { backgroundColor: colors[1] }]}>
        <Image source={icon} style={styles.icon} />
      </View>
    </View>
  );
};

const ServiceScreen = () => {
  const [activeTab, setActiveTab] = useState("Information");

  const tabs = ["Information", "Thoughts", "Community", "Profile", "Settings"];

  return (
     <View style={styles.container}>
      {/* Help Card */}
      <Card
        title="Help"
        icon={require('/Users/tamilselvan/V1/assets/welcome.jpg')} // replace with your image path
        colors={['#DDA8F6', '#C785F5']}
      />

      {/* Events Card */}
      <Card
        title="Events"
        icon={require('/Users/tamilselvan/V1/assets/welcome.jpg')} // replace with your image path
        colors={['#65CFFF', '#A3E4FF']}
      />

      {/* Gadgets Card */}
      <Card
        title="Gadgets"
        icon={require('/Users/tamilselvan/V1/assets/welcome.jpg')} // replace with your image path
        colors={['#49C5A6', '#8BFBE7']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'top',
    alignItems: 'center',
    paddingTop: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});


export default ServiceScreen;