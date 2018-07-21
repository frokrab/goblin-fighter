import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class Moves extends React.Component {
  render() {
    return (
      <View style={styles.movesBox}>
        <View style={{width: '10%'}}></View>
        <View style={styles.movesColumn}>
          <Button
            disabled={this.props.cooldown}
            onPress={this.props.nap}
            title='NAP'
            color='firebrick'
          />
          <Button
            disabled={this.props.cooldown}
            onPress={this.props.charm}
            title='CHARM'
            color='firebrick'
          />
        </View>
        <View style={{width: '10%'}}></View>
        <View style={styles.movesColumn}>
          <Button
            disabled={this.props.cooldown}
            onPress={this.props.kick}
            title='KICK'
            color='firebrick'
          />
          <Button
            disabled={this.props.cooldown}
            onPress={this.props.spit}
            title='SPIT'
            color='firebrick'
          />
        </View>
        <View style={{width: '10%'}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movesBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 2,
    width: '100%',
    height: '30%',
    backgroundColor: 'darkgray',    
  },
  movesColumn: {
    flex: 1,
    justifyContent: 'space-around',
  }
});

export default Moves;
