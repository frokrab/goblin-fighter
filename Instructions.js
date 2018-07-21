import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// INSTRUCTIONS //
class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.instructionsContainerContainer}>
        <View style={styles.instructionsContainer}>
          <Text style={{fontWeight: 'bold'}}>Kick:</Text>
          <Text style={styles.instructionsText}>Kick the enemy to damage them a lot with a short cooldown. Always critically hits incapacitated goblins.</Text>
          <Text style={{fontWeight: 'bold'}}>Spit:</Text>
          <Text style={styles.instructionsText}>Spit on the enemy to damage them a bit with a shorter cooldown. Has a chance to incapacitate the enemy.</Text>
          <Text style={{fontWeight: 'bold'}}>Nap:</Text>
          <Text style={styles.instructionsText}>Take a short nap and restore all of your health at the cost of a very long cooldown.</Text>
          <Text style={{fontWeight: 'bold'}}>Charm:</Text>
          <Text style={styles.instructionsText}>Attempt to charm the enemy, incapacitating them and healing you for a small amount with medium cooldown. Charming a charmed enemy instead will heal you double.</Text>
          <Text style={{fontWeight: 'bold'}}>Attack:</Text>
          <Text style={styles.instructionsText}>Makes your kicks deal more damage.</Text>
          <Text style={{fontWeight: 'bold'}}>Defense:</Text>
          <Text style={styles.instructionsText}>Makes you take less damage from goblin attacks.</Text>
          <Text style={{fontWeight: 'bold'}}>Speed:</Text>
          <Text style={styles.instructionsText}>Reduces all of your cooldown times.</Text>
          <Text style={{fontWeight: 'bold'}}>Luck:</Text>
          <Text style={styles.instructionsText}>Fortune favors the bold. And the lucky.</Text>
        </View>
        <Button 
          onPress={() => this.props.changeDisplay('stats')}
          title='BACK'
          color='firebrick'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructionsContainerContainer: {
    flex: 1,
    backgroundColor: 'dimgray', 
    paddingTop: '3%',
  },
  instructionsContainer: {
    flex: 1,
    backgroundColor: 'gray', 
    margin: '5%',
    padding: '3%',
  },
  instructionsText: {
    paddingLeft: '5%',
    paddingBottom: '5%',
  }
});

export default Instructions;
