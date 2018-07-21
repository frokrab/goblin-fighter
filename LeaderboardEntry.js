import React from 'react';
import { View, Text } from 'react-native';

class LeaderboardEntry extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 20}}>{this.props.index + 1}</Text>
        <Text style={{fontSize: 20}}>{this.props.name}</Text>
        <Text style={{fontSize: 20}}>{this.props.score}</Text>
      </View>
    );
  }
}

export default LeaderboardEntry;
