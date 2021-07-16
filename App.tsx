import * as React from 'react';
import { Component, useEffect, useState }  from 'react';
import { Switch, Text, View, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect} from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

// ディレクトリから、該当ファイルをimport
import Home from './task';
import Webview from './webview';
import puyo from './task_puyo';

// settingで使う変数
var switchText = "ぷよぷよモード";
var modeText = "Normal";

// ホーム画面の切替で使う変数（未実装）
var nicoOrPuyo = false;

// setting画面のコンポーネント
class Setting extends Component {
  state = {
    switching: false,
    nico_puyo_mode_switching: false,
  }
  // スイッチと連動して、表示する文言を変更する
  switchValue = (value) => {
    this.setState({ switching: value });
    modeText = value ? '    Dark' : 'Normal';
  }
  switchValue2 = (value) => {
    this.setState({ nico_puyo_mode_switching: value });
    switchText = value ? 'ニコニコモード' : 'ぷよぷよモード';
    nicoOrPuyo = value;
  }
  // ホーム画面の切替を行う際に使う予定の関数（未実装）
  getNicoPuyoValue(){
    return this.state.nico_puyo_mode_switching;
  }
  render() {
    const switching = this.state.switching;
    const navigate = this.props.navigation; // errorでてるけどうまく動く
    return (
      <View style={styles.container}>
        <View style={{marginLeft: 10, marginTop: 50 ,width: 50}}>
          <Icon.Button
            name='bars'
            color='#3D405B'
            backgroundColor='transparent'
            onPress={() => {navigate.openDrawer()}}
            size={30}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.paragraph}>
            {modeText} Mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#3D405B" }}
            onValueChange = {this.switchValue}
            value = {switching}
          />
          <Text style={styles.paragraph}>
            {switchText}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#3D405B" }}
            onValueChange = {this.switchValue2}
            value = {this.state.nico_puyo_mode_switching}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1DE',
  },
  toggleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F1DE',
    marginBottom: "50%"
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#3D405B',
  },
});

/////////////////////////////////// ナビゲーションドロワー ////////////////////////////////////
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" overlayColor="rgba( 61, 64, 91, 0.8 )"
      drawerStyle={{
        backgroundColor: '#3D405B',
        width: "70%",
      }}
      drawerContentOptions={{
        activeBackgroundColor: "#f4f1de",
        activeTintColor: "#3D405B",
        inactiveTintColor: "#F4F1DE"
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={puyo} options={{ drawerLabel: 'Home' }}/>
      <Drawer.Screen name="Webview" component={Webview} />
      <Drawer.Screen name="object_obstacle" component={puyo} />
      <Drawer.Screen name="text_moving" component={Home} />
      <Drawer.Screen name="S" component={Setting} />
    </Drawer.Navigator>
  );
}

// nicoOrPuyoの値でドロワーの中身が変わるようにしたい。（未実装）
export default class Main extends Component {
  state = {
    nicopuyo: nicoOrPuyo,
  }
  render(){
    return(
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    );
  }
}
