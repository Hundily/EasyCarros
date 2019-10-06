import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class BackupScreen extends Component {
  static navigationOptions = { header: null, gesturesEnabled: false };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "blue" }}>
          <Text>Top</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "green" }}>
          <Text>Center</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "pink" }}>
          <Text>footer</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
