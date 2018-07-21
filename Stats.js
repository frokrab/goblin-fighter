import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatsEntry from './StatsEntry.js';

class Stats extends React.Component {
  render() {
    return (
      <View style={styles.statsTable}>
        {Object.entries(this.props.stats).map((stat, index) => <StatsEntry addStatPoint={this.props.addStatPoint} key={index} stat={stat[0]} val={stat[1]} />)}
        <Text style={{fontSize: 25}}>Available Points: {this.props.statPoints}</Text>
        <Text style={{fontSize: 25}}>Goblins Defeated: {this.props.goblinsKilled}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statsTable: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: '10%',
  },
});

export default Stats;
