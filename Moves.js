import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class Moves extends React.Component {
  render() {
    return (
      <View style={styles.movesBox}>
        <Button
          disabled={this.props.cooldown}
          onPress={this.props.kick}
          title='KICK'
          color='firebrick'
        />
        <View style={{height: 10}}></View>
        <Button
          disabled={this.props.cooldown}
          onPress={this.props.spit}
          title='SPIT'
          color='firebrick'
        />
        <View style={{height: 10}}></View>
        <Button
          disabled={this.props.cooldown}
          onPress={this.props.nap}
          title='NAP'
          color='firebrick'
        />
        <View style={{height: 10}}></View>
        <Button
          disabled={this.props.cooldown}
          onPress={this.props.charm}
          title='CHARM'
          color='firebrick'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movesBox: {
    borderColor: 'black',
    borderWidth: 2,
    width: '100%',
    height: '30%',
    backgroundColor: 'darkgray',    
  },
});

export default Moves;
