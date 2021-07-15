import React, { Component,useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native';

var move_text = ["ぷよぷよモード","ニコニコモード"];

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnimation : new Animated.Value(Dimensions.get('window').width),
      positionY: 0,
      isShowingText: false,
    };
    setTimeout( () => {
      this.setState({ isShowingText: true} );
      var random_y = Math.random() * ( Dimensions.get('window').height - 100 - 100) + 100;
      random_y = -1 * random_y;
      this.setState({ positionY: random_y });
      Animated.timing(this.state.moveAnimation, {
        toValue: -700,
        duration: 6000,
        // useNativeDriver: true,
      }).start();
      InteractionManager.runAfterInteractions(()=>{ this.setState({ isShowingText: false, moveAnimation: new Animated.Value(Dimensions.get('window').width),}); });
    }, 1000+ this.props.id*1000);
    setInterval( () => { // while true のタイマー版
      this.setState({ isShowingText: true} );
      var random_y = Math.random() * ( Dimensions.get('window').height - 100 - 100) + 100;
      random_y = -1 * random_y;
      Animated.timing(this.state.moveAnimation, {
        toValue: -700,
        duration: 6000,
        // useNativeDriver: true,
      }).start();
      InteractionManager.runAfterInteractions(()=>{ this.setState({ isShowingText: false, moveAnimation: new Animated.Value(Dimensions.get('window').width),}); });
    },20000 + 1000*this.props.id); // 10秒ごとに繰り返す
  }
  render(){
    const display_text = this.state.isShowingText ? this.props.text : ' ';
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.text, {transform: [{ translateX: this.state.moveAnimation }, { translateY: this.state.positionY }]}]}>
          <Text>{ display_text }</Text>
        </Animated.Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F4F1DE',
    // padding: 20,
  },
  text: {
    fontSize: 30,
    textAlign: "right",
    position: "absolute",
    // top: 30,
  },
});

// export default function App() {
//   return (
//     <Main text={move_text[0]}/>
//   );
// }