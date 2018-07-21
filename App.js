import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Instructions from './Instructions.js';
import Leaderboard from './Leaderboard.js';
import ScoreSubmission from './ScoreSubmission.js';
import Death from './Death.js';
import Combat from './Combat.js';
import Stats from './Stats.js';

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
    this.spit = this.spit.bind(this);
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
          display: 'death',
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
          health: this.state.health <= 85 ? this.state.health + 15 : 100,
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
    if (this.state.goblinInactive || 100 * Math.random() < (7 + (.35 * this.state.stats.LUCK))) {
      rawDamage = Math.ceil(rawDamage * 1.5);
    }
    const healthRemaining = this.state.goblinHealth - rawDamage;
    if (healthRemaining <= 0) {
      this.setState({
        health: 100,
        display: 'stats',
        goblinHealth: 0,
        cooldown: false,
        statPoints: 5,
        goblinInactive: true,
        goblinsKilled: this.state.goblinsKilled + 1,
      });
    } else {
      this.setState({
        goblinHealth: healthRemaining,
        cooldown: true,
      });
      this.cooldownTimer(1);
    }
  }

  spit() {
    const level = this.state.goblinLevel;
    let rawDamage = Math.ceil((10 * this.state.stats.ATTACK) / this.state.goblin.DEFENSE);
    const healthRemaining = this.state.goblinHealth - rawDamage;
    if (100 * Math.random() < (7 + (.35 * this.state.stats.LUCK))) {
      rawDamage = Math.ceil(rawDamage * 1.5);
    }
    if (100 * Math.random() < (20 + (.3 * this.state.stats.LUCK))) {
      if (!this.state.goblinInactive) {
        this.setState({
          goblinInactive: true,
        }, () => {
          setTimeout(() => {
            if (this.state.goblinLevel === level && this.state.display === 'GOBLINS') {
              this.setState({
                goblinInactive: false,
              }, this.goblinRepeat);
            }
          }, 2 * Math.ceil(2501 - this.state.goblin.SPEED * 12.5));
        });
      }
    }
    if (healthRemaining <= 0) {
      this.setState({
        health: 100,
        display: 'stats',
        goblinHealth: 0,
        cooldown: false,
        statPoints: 5,
        goblinInactive: true,
        goblinsKilled: this.state.goblinsKilled + 1,
      });
    } else {
      this.setState({
        goblinHealth: healthRemaining,
        cooldown: true,
      });
      this.cooldownTimer(0.8);
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
    } else if (this.state.display === 'death') {
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
          goblinInactive={this.state.goblinInactive}
          cooldown={this.state.cooldown}
          health={this.state.health}
          spit={this.spit}
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
});
