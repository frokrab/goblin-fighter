import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class StatsEntry extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.statsEntry}>{this.props.stat}: {this.props.val}</Text>
        <Button
          disabled={this.props.val >= 200}
          onPress={() => this.props.addStatPoint(this.props.stat)}
          title='+'
          color='firebrick'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statsEntry: {
    fontSize: 27,
    paddingRight: 20
  },
});

export default StatsEntry;
