import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const axios = require('axios');

class ScoreSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.submitScore = this.submitScore.bind(this);
  }

  submitScore() {
    axios.post('http://54.219.137.82:6084/leaderboard', {
      name: this.state.name.toUpperCase(),
      score: this.props.score,
    })
    .then(() => {
      this.props.rebirth();
      this.props.changeDisplay('leaderboard');
    })
    .catch(() => {
      this.props.changeDisplay('stats');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{
            borderWidth: 1,
            width: '40%',
            marginBottom: 30
          }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
          maxLength={3}
          placeholder='NGP'
          placeholderTextColor='gray'
          autoCapitalize='characters'
        />
        <Button 
          title='SUBMIT'
          color='firebrick'
          onPress={this.submitScore}
          />
        <View style={{paddingBottom: 10}}></View>
        <Button 
          title='BACK'
          color='firebrick'
          onPress={() => this.props.changeDisplay('death')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
    alignItems: 'center',
    paddingTop: '12%',
    paddingBottom: '3%',
  },
});

export default ScoreSubmission;
