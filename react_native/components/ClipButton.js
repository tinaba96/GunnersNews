import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

const ClipButton = ({click, enabled}) => {
  const name = enabled ? 'ios-bookmarks' : 'ios-bookmarks-outline';
  return (
    <TouchableOpacity onPress={click} style={styles.container}>
      <Ionicons name={name} size={40} color="gray" />
    </TouchableOpacity>
  );
};

export default ClipButton;