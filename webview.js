import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import todoList from './api/todosList.json';
import Puyo from './puyo';
// ...

var Puyos = [];

export default class MyWebComponent extends Component {
  render() {
    for (let i = 0; i < todoList.length; i++) {
      Puyos.push(
        <Puyo num={i} id={todoList[i].id}/>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{marginLeft: 10, width: 50}}>
          <Icon.Button
            name='bars'
            color='#3D405B'
            backgroundColor='transparent'
            onPress={() => {this.props.navigation.openDrawer()}}
            size={30}
          />
        </View>
        <WebView source={{ uri: 'https://twitter.com/explore/tabs/for-you' }} />
        {Puyos}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    marginTop: 30,
    // backgroundColor: "#F4F1DE",
  },
});