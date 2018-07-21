import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const axios = require('axios');
import LeaderboardEntry from './LeaderboardEntry.js';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderboard: [{}],
    }
  }

  getLeaderboard() {
    axios.get('http://54.219.137.82:6084/leaderboard')
    .then(res => {
      this.setState({
      leaderboard: res.data.rows.slice(0,10),
      })
    })
    .catch(this.setState({
      leaderboard: [{
        name: 'Error loading leaderboard, try again later',
        score: '',
      }]
    }));
  }

  componentDidMount() {
    this.getLeaderboard();
  }

  render() {
    return (
      <View style={styles.leaderboardContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{fontSize: 20}}>RANK</Text>
          <Text style={{fontSize: 20}}>NAME</Text>
          <Text style={{fontSize: 20}}>SCORE</Text>
        </View>
        {this.state.leaderboard.map((entry, index) => <LeaderboardEntry name={entry.name} score={entry.score} key={index} index={index}/>)}
        <View style={{paddingBottom: 10}}></View>
        <Button
          onPress={() => this.props.back('stats')}
          color='firebrick'
          title='BACK'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'dimgray',
    paddingTop: '12%',
    paddingBottom: '7%',
  },
});

export default Leaderboard;
