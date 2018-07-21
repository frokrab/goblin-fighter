import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HealthBar from './HealthBar.js';
import Moves from './Moves.js';
const goblinInactiveSprite = require('./goblin-inactive.png');
const goblinSprite = require('./goblin.png');
const palpacaSprite = require('./palpaca.png');

class Combat extends React.Component {
  render() {
    return (
      <View style={styles.combatContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <HealthBar health={this.props.health}/>
          <HealthBar health={this.props.goblinHealth}/>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: '15%'}}>
          <View style={{ height: '50%', paddingLeft: '75%'}}>
            <Image source={this.props.goblinInactive ? goblinInactiveSprite : goblinSprite} />
            <Text>{this.props.goblin.ATTACK} {this.props.goblin.DEFENSE} {this.props.goblin.SPEED}</Text>
          </View>
          <View style={{height: '50%', paddingLeft: '15%',}}>
            <Image source={palpacaSprite} />
          </View>
        </View>
        <Moves
          cooldown={this.props.cooldown}
          kick={this.props.kick}
          spit={this.props.spit}
          nap={this.props.nap}
          charm={this.props.charm}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  combatContainer: {
    flex: 1,
    backgroundColor: 'dimgray',
    paddingTop: '12%',
  },
});

export default Combat;
