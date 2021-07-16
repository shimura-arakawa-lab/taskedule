import React, { Component,useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native';

// 色分けのボールカラーの用意
const ball_color = ["#E07A5F","#81B29A","#F2CC8F"]

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnimation : new Animated.Value(-1*Dimensions.get('window').height),
    };
    // オブジェクトの配置（番号）によって、下に到達する距離を計算している
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
    // 配置が偶数番目のオブジェクトは、右に移動させるように記述
    const left_num =  (this.props.num%2)*170;
    // idによって、色分けを行うように計算
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
