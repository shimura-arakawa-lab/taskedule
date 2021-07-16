import React, { Component,useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnimation : new Animated.Value(Dimensions.get('window').width),
      positionY: 0,
      isShowingText: false,
    };
    // 右端から左端まで動くコード
    setTimeout( () => {
      this.setState({ isShowingText: true} );
      var random_y = Math.random() * ( Dimensions.get('window').height - 100 - 100) + 100;
      random_y = -1 * random_y;
      this.setState({ positionY: random_y });
      Animated.timing(this.state.moveAnimation, {
        toValue: -700,
        duration: 6000,
        // useNativeDriver: true, // ここtrueにすると動かない
      }).start();
      // Animated.timing が終わったら、元の場所に戻し、表示をfalseにする
      InteractionManager.runAfterInteractions(()=>{ this.setState({ isShowingText: false, moveAnimation: new Animated.Value(Dimensions.get('window').width),}); });
    }, 1000+ this.props.id*1000); // idごとに時間を調整。同時にstartするのを防ぐ。
    // 無限ループ版
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
    },20000 + 1000*this.props.id); // idごとに時間を調整。同時にstartするのを防ぐ。
  }
  render(){
    // isShowingText の boolean で表示を切り替える
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
  },
  text: {
    fontSize: 30,
    textAlign: "right",
    position: "absolute",
  },
});