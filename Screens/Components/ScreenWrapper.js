import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';

const ScreenWrapper = ({ children, bg }) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;

