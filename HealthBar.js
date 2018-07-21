import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HealthBar extends React.Component {
  render() {
    return (
      <View style={styles.healthBarOuter}>
        <View style={{backgroundColor: 'green', height: '100%', width: `${this.props.health}%`}}></View>
        <Text style={styles.healthBarText}>{this.props.health}/100</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  healthBarOuter: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:'black',
    height: 10,
    width: '30%',
  },
  healthBarText: {
    fontSize: 8,
    zIndex: 1,
    position: 'absolute',
    paddingLeft: '5%',
  }
})

export default HealthBar;
