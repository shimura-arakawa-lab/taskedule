import React, { Component,useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native';

const ball_color = ["#E07A5F","#81B29A","#F2CC8F"]

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnimation : new Animated.Value(-1*Dimensions.get('window').height),
    };
    var move_value=0;
    if( this.props.num%2 == 0 ) {
      move_value = this.props.num*85
    } else{
      move_value = this.props.num*85-75;
    }
    setTimeout( () => {
      Animated.timing(this.state.moveAnimation, {
        toValue: -100-(move_value),
        duration: 6000,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }
  render(){
    const left_num =  (this.props.num%2)*170;
    const ball_num = (this.props.id-1) % 3;
    return (
      <View style={styles.container}>
        <Animated.View style={[{left:left_num, backgroundColor: ball_color[ball_num]},styles.puyo, {transform: [{ translateY: this.state.moveAnimation }]}]}>
        </Animated.View>
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
  puyo: {
    position: "absolute",
    // backgroundColor: "#E07A5F",
    padding: 80,
    borderRadius: 100,
    marginHorizontal:20,
    // left: "10%",
    // top: 30,
  },
  button: {
    padding: 10,
    margin: 20,
    backgroundColor: "#3d405b",
    borderRadius: 10,
  },
});

// export default function App() {
//   return (
//     <Main num={0}/>
//   );
// }