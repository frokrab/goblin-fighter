import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
const graveSprite = require('./grave.png');

class Death extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>roses are red</Text>
        <Text style={{fontSize: 25}}>violets are blue</Text>
        <Text style={{fontSize: 25}}>you were killed by a goblin lmao</Text>
        <Text style={{fontSize: 25}}>feels bad</Text>
        <Text style={{paddingTop: '5%', fontSize: 20}}>You defeated {this.props.goblinsKilled} goblins</Text>
        <Text style={{fontSize: 20}}>before they defeated you.</Text>
        <Text style={{paddingTop: '5%', fontSize: 20, fontWeight: 'bold'}}>Final Stats: </Text>
        <Text style={{fontSize: 20}}>ATTACK: {this.props.stats.ATTACK}</Text>
        <Text style={{fontSize: 20}}>DEFENSE: {this.props.stats.DEFENSE}</Text>
        <Text style={{fontSize: 20}}>SPEED: {this.props.stats.SPEED}</Text>
        <Text style={{fontSize: 20}}>LUCK: {this.props.stats.LUCK}</Text>
        <Text style={{paddingTop: '5%', fontSize: 20, fontWeight: 'bold'}}>Goblin Champion's Stats:</Text>
        <Text style={{fontSize: 20}}>ATTACK: {this.props.goblin.ATTACK}</Text>
        <Text style={{fontSize: 20}}>DEFENSE: {this.props.goblin.DEFENSE}</Text>
        <Text style={{fontSize: 20}}>SPEED: {this.props.goblin.SPEED}</Text>
        <Image source={graveSprite} />
        <Button
          onPress={this.props.rebirth}
          title='REBIRTH' 
          color='firebrick'
        />
        <View style={{marginTop: 10}}></View>
        <Button
          onPress={() => {
            this.props.changeDisplay('submit');
          }}
          title='SUBMIT SCORE'
          color='firebrick'
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
    paddingTop: '8%',
  },
});

export default Death;
