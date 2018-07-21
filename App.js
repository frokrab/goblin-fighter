import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
const axios = require('axios');
const palpacaSprite = require('./palpaca.png');
const goblinSprite = require('./goblin.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      health: 100,
      stats: {
        ATTACK: 5,
        DEFENSE: 5,
        SPEED: 5,
        LUCK: 5,
      },
      display: 'stats',
      cooldown: false,
      statPoints: 20,
      goblin: {
        ATTACK: 0,
        DEFENSE: 0,
        SPEED: 0,
      },
      goblinLevel: 20,
      goblinHealth: 0,
      goblinInactive: true,
      goblinsKilled: 0,
    }

    this.addStatPoint = this.addStatPoint.bind(this);
    this.beginFight = this.beginFight.bind(this);
    this.rebirth = this.rebirth.bind(this);
    this.kick = this.kick.bind(this);
    this.nap = this.nap.bind(this);
    this.charm = this.charm.bind(this);
    this.goblinRepeat = this.goblinRepeat.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(screen) {
    this.setState({
      display: screen
    })
  }

  goblinRepeat() {
    if (!this.state.goblinInactive) {
      let rawDamage = Math.ceil((20 * this.state.goblin.ATTACK) / this.state.stats.DEFENSE);
      if (100 * Math.random() < (3 + (.08 * this.state.stats.LUCK))) {
        rawDamage = 0;
      }
      const healthRemaining = this.state.health - rawDamage;
      if (healthRemaining <= 0) {
        this.setState({
          health: 0,
          goblinInactive: true,
          display: 'defeat'
        })
      } else {
        this.setState({
          health: healthRemaining,
        }, () => {
          setTimeout(this.goblinRepeat, Math.ceil(2501 - this.state.goblin.SPEED * 12.5));
        });
      }
    }
  }

  cooldownTimer(timeFactor) {
    const cooldownTime = Math.ceil(2501 - this.state.stats.SPEED * 12.5) * timeFactor;
    setTimeout(() => {
      this.setState({
        cooldown: false,
      });
    }, cooldownTime);
  }

  charm() {
    const level = this.state.goblinLevel;
    if (100 * Math.random() < (40 + (.3 * this.state.stats.LUCK))) {
      if (this.state.goblinInactive) {
        this.setState({
          health: this.state.health <= 70 ? this.state.health + 30 : 100,
        });
      } else {
        this.setState({
          health: this.state.health + 15,
          goblinInactive: true,
        }, () => {
          setTimeout(() => {
            if (this.state.goblinLevel === level && this.state.display === 'GOBLINS') {
              this.setState({
                goblinInactive: false,
              }, this.goblinRepeat);
            }
          }, 3 * Math.ceil(2501 - this.state.goblin.SPEED * 12.5));
        });
      }
    }
    this.setState({
      cooldown: true,
    })
    this.cooldownTimer(1.25);
  }

  nap() {
    this.setState({
      health: 100,
      cooldown: true,
    });
    let cooldownFactor = 3;
    if (100 * Math.random() < (7 + (.35 * this.state.stats.LUCK))) {
      cooldownFactor = 2.2;
    }
    this.cooldownTimer(cooldownFactor);
  }

  kick() {
    let rawDamage = Math.ceil((25 * this.state.stats.ATTACK) / this.state.goblin.DEFENSE);
    if (100 * Math.random() < (7 + (.35 * this.state.stats.LUCK))) {
      rawDamage = Math.ceil(rawDamage * 1.5);
    }
    const healthRemaining = this.state.goblinHealth - rawDamage;
    const deadGoblins = this.state.goblinsKilled + 1;
    if (healthRemaining <= 0) {
      this.setState({
        health: 100,
        display: 'stats',
        goblinHealth: 0,
        cooldown: false,
        statPoints: 5,
        goblinInactive: true,
        goblinsKilled: deadGoblins,
      });
    } else {
      this.setState({
        goblinHealth: healthRemaining,
        cooldown: true,
      });
      this.cooldownTimer(1);
    }
  }

  addStatPoint(stat) {
    if (this.state.statPoints > 0) {
      let newStats = this.state.stats;
      newStats[stat]++;
      let remainingPoints = this.state.statPoints - 1;
      this.setState({
        stats: newStats,
        statPoints: remainingPoints,
      });
    }
  }

  rebirth() {
    this.setState({
      stats: {
        ATTACK: 5,
        DEFENSE: 5,
        SPEED: 5,
        LUCK: 5,
      },
      health: 100,
      goblinHealth: 100,
      statPoints: 20,
      display: 'stats',
      goblin: {
        ATTACK: 0,
        DEFENSE: 0,
        SPEED: 0,
        LUCK: 0,
      },
      goblinLevel: 20,
      goblinInactive: true,
      goblinsKilled: 0,
    });
  }

  beginFight() {
    const level = this.state.goblinLevel
    let statsArray = [0, 0, 0];
    for (let i = 0; i < level; i++) {
      statsArray[Math.floor(3 * Math.random())] += 1;
    }
    if (100 * Math.random() < (1 + (.05 * this.state.stats.LUCK))) {
      statsArray = [7, 7, 7];
    }
    let goblinStats = {
      ATTACK: statsArray[0],
      DEFENSE: statsArray[1],
      SPEED: statsArray[2],
    }
    this.setState({
      display: 'GOBLINS',
      goblin: goblinStats,
      goblinLevel: level + 6,
      goblinHealth: 100,
      goblinInactive: false,
    }, () => setTimeout(this.goblinRepeat, 500));
  }

  render() {
    if (this.state.display === 'stats') {
      return (
        <View style={styles.statsContainer}>
          <Text style={styles.title}>GOBLIN FIGHTER</Text>
          <Stats
            addStatPoint={this.addStatPoint.bind(this)}
            stats={this.state.stats}
            statPoints={this.state.statPoints}
            goblinsKilled={this.state.goblinsKilled}
          />
          <Button
            onPress={this.beginFight}
            title='FIGHT'
            disabled={this.state.statPoints !== 0}
            color='firebrick'
          />
          <View style={{paddingBottom: 10}}></View> 
          <Button
            onPress={() => this.changeDisplay('instructions')}
            title='INSTRUCTIONS'
            color='firebrick'
          />
          <View style={{paddingBottom: 10}}></View> 
          <Button
            onPress={() => this.changeDisplay('leaderboard')}
            title='LEADERBOARD'
            color='firebrick'
          />
        </View>
      );
    } else if (this.state.display === 'defeat') {
      return (
        <Death 
          changeDisplay={this.changeDisplay}
          stats={this.state.stats}
          goblin={this.state.goblin}
          goblinsKilled={this.state.goblinsKilled}
          rebirth={this.rebirth}
        />
      );
    } else if (this.state.display === 'GOBLINS') {
      return (
        <Combat
          goblin={this.state.goblin}
          cooldown={this.state.cooldown}
          health={this.state.health}
          kick={this.kick}
          nap={this.nap}
          charm={this.charm}
          goblinHealth={this.state.goblinHealth}
        />
      );
    } else if (this.state.display === 'leaderboard') {
      return (
        <Leaderboard back={this.changeDisplay}/>
      );
    } else if (this.state.display === 'submit') {
      return (
        <ScoreSubmission 
          score={this.state.goblinsKilled}
          changeDisplay={this.changeDisplay}
          rebirth={this.rebirth}
        />
      )
    } else if (this.state.display === 'instructions') {
      return (
        <Instructions changeDisplay={this.changeDisplay} />
      );
    }
  }
}

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
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Kick the enemy to damage them with a very short cooldown.</Text>
          <Text style={{fontWeight: 'bold'}}>Nap:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Take a short nap and restore all of your health at the cost of a very long cooldown.</Text>
          <Text style={{fontWeight: 'bold'}}>Charm:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Attempt to charm the enemy, temporarily disbling them and healing you for a small amount with a pretty short cooldown. Charming a charmed enemy instead will heal you double.</Text>
          <Text style={{fontWeight: 'bold'}}>Attack:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Makes your kicks deal more damage.</Text>
          <Text style={{fontWeight: 'bold'}}>Defense:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Makes you take less damage from goblin attacks.</Text>
          <Text style={{fontWeight: 'bold'}}>Speed:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 20}}>Reduces all of your cooldown times.</Text>
          <Text style={{fontWeight: 'bold'}}>Luck:</Text>
          <Text style={{paddingLeft: 15, paddingBottom: 60}}>Fortune favors the bold. And the lucky.</Text>
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

// LEADERBOARD //
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

// SCORE SUBMISSION SCREEN //
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
      name: this.state.name,
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
      <View style={styles.statsContainer}>
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
      </View>
    );
  }
}

// DEATH SCREEN //
class Death extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.deathContainer}>
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
        <Image source={goblinSprite} resizeMode='contain' />
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

// COMBAT SCREEN //
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
            <Image source={goblinSprite} />
            <Text>{this.props.goblin.ATTACK} {this.props.goblin.DEFENSE} {this.props.goblin.SPEED}</Text>
          </View>
          <View style={{height: '50%', paddingLeft: '15%',}}>
            <Image source={palpacaSprite} resizeMethod= 'scale' resizeMode='cover'/>
          </View>
        </View>
        <Moves cooldown={this.props.cooldown} kick={this.props.kick} nap={this.props.nap} charm={this.props.charm}/>
      </View>
    )
  }

}

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

class HealthBar extends React.Component {
  render() {
    return (
      <View style={styles.healthBarOuter}>
        <View style={{backgroundColor: 'green', height: '100%', width: `${this.props.health}%`}}>
          <Text style={{fontSize: 8}}>{this.props.health}/100</Text>
        </View>
      </View>
    );
  }
}

// STATS/TITLE SCREEN //

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

// STYLESHEETS //

const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    backgroundColor: 'dimgray',
    alignItems: 'center',
    paddingTop: '12%',
    paddingBottom: '3%',
  },
  title: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'darkseagreen',
  },
  statsTable: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: '10%',
  },
  statsEntry: {
    fontSize: 27,
    paddingRight: 20
  },
  healthBarOuter: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:'black',
    height: 10,
    width: '30%',
  },
  combatContainer: {
    flex: 1,
    backgroundColor: 'dimgray',
    paddingTop: '12%',
  },
  movesBox: {
    borderColor: 'black',
    borderWidth: 2,
    width: '100%',
    height: '30%',
    backgroundColor: 'darkgray',    
  },
  leaderboardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'dimgray',
    paddingTop: '12%',
    paddingBottom: '7%',
  },
  deathContainer: {
    flex: 1,
    backgroundColor: 'dimgray',
    alignItems: 'center',
    paddingTop: '8%',
  },
  instructionsContainerContainer: {
    flex: 1,
    backgroundColor: 'dimgray', 
    paddingTop: '12%',
  },
  instructionsContainer: {
    flex: 1,
    backgroundColor: 'gray', 
    margin: '5%',
    padding: '3%',
  },
});
