import React, { Component, FC, Fragment ,useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Button, FlatList, Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
// 簡易API
import todoList from './api/todosList.json';
import DateTimePicker from '@react-native-community/datetimepicker';

import MoveText from './text_move';

var MoveTexts: any[] = [];

// 型指定
// Todoタイプ定義
type Todo = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
}

// Modeタイプ定義
type Mode = 'list' | 'add';

// TypeScriptでのファンクションコンポーネントの型指定
function App ( {navigation} ) {

  // 初期値
  const [ready, setReady] = useState(false);
  const getReady = () => {
    setTodos(todoList);
    setReady(true);
  }
  useEffect(() => {
    getReady();
  }, []);

  // モードチェンジ
  const [mode, setMode] = useState<Mode>('list');
  const changeMode = (mode: Mode) => {
    setMode(mode);
  }
  const handlePlus = () => {
    changeMode('add'); // modal表示
  }
  const handleCancel = () => {
    changeMode('list'); // リスト表示
  }

  // TODO追加
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (todo: Todo) => {
    setTodos(todos => [...todos, todo]);
  }
  const handleAdd = () => {
    if(!title || !description || !deadline) return;
    const newTodo: Todo = {
      id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
      title,
      description,
      deadline,
      done: false
    }
    addTodo(newTodo);
    changeMode('list');
  }

  // TODO入力フォーム初期値
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  // inputを初期化する関数
  const resetInput = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
  }
  useEffect(() => {
    if(mode === 'list') {
      resetInput(); // インプットの入力フォームの中身の初期化
    }
  }, [mode]);

  // TODO削除
  const deleteTodo = (id: number) => {
    // 同じidを持つものを削除する
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }
  const handleDelete = (id: number) =>{
    deleteTodo(id);
  }

   //日付から文字列に変換する関数
   function getStringFromDate(date) {
    var year_str = date.getFullYear();
    //月だけ+1すること
    var month_str = 1 + date.getMonth();
    var day_str = date.getDate();

    var format_str = 'YYYY-MM-DD';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    return format_str;
  }

  // カレンダー入力の関数
  const [pick_day, setDay] = useState(new Date());
  const [isShowDatePicker, setShowDay] = useState(false);
  const changeDay = (event, selectedDate) => {
    setDay(selectedDate);
    setShowDay(!isShowDatePicker);
    // const eee = getStringFromDate(selectedDate); // yyyy-mm-dd に変換するやつ
    // setDeadline(eee);
    setDeadline(selectedDate.toString().slice( 0, -23 )); // 他のところをdateにするのだるかったので、stringに変換。
  };

  // ニコニコ機能の紐付け。タスクのタイトルとidを入れている。
  MoveTexts = [];
  for (let i = 0; i < todos.length; i++) {
    MoveTexts.push(
      <MoveText text={todos[i].title} id={todos[i].id} />
    );
  }

  // 描画部分
  return (
    <Fragment>
      {/* ホーム画面 */}
      <SafeAreaView style={styles.container}>
        <View style={{marginLeft: 10, width: 50}}>
          <Icon.Button
            name='bars'
            color='#3D405B'
            backgroundColor='transparent'
            onPress={() => {navigation.openDrawer()}}
            size={30}
          />
        </View>
        <Text style={styles.app_title}>taskedule</Text>
        <View style={styles.todo_wrapper}>
          <FlatList
            data={todos}
            renderItem={({ item: todo }) => {
              // スワップアウトボタンが実行されたときの挙動の定義
              var swipeoutBtn = [
                {
                  backgroundColor: "#fff",
                  component: (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "完了してよろしいですか？",
                          "",
                          [
                            {
                              text: "キャンセル",
                              style: "cancel"
                            },
                            {
                              text: "完了",
                              onPress: () => {
                                handleDelete(todo.id);
                              }
                            }
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text style={ styles.delete }>完了</Text>
                    </TouchableOpacity>
                  )
                }
              ];
              return (
                <View style={styles.todo_container}>
                  <Swipeout right={swipeoutBtn} backgroundColor="#F4F1DE">
                    <Text numberOfLines={3} style={styles.todo_title}>
                      { todo.title }: { todo.description }: {todo.deadline}
                    </Text>
                  </Swipeout>
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
      {/* テキストを表示するタグの生成 */}
      {MoveTexts}
      {/* タスクを追加するボタン */} 
      <View>
        <TouchableOpacity onPress={() => handlePlus()} style={styles.taskButton}> 
          <Text style={ styles.plus }>+</Text>
        </TouchableOpacity>
      </View>

      {/* タスク追加ボタンが押されたあとのモーダル */}
      <Modal visible={ mode === 'add'} animationType={ 'slide' }>
        <View style={ styles.modal }>
          <View style={ styles.textinput_frame }>
            <Text style={ styles.modal_text_title}>タスク名</Text>
            <TextInput
              placeholder={'タスク名'}
              value={ title }
              onChangeText={ text => setTitle(text) }
              style={ styles.textinput }
            />
            <Text style={ styles.modal_text_title}>詳細</Text>
            <TextInput
              placeholder={'詳細'}
              value={ description }
              onChangeText={ text => setDescription(text) }
              style={ styles.textinput }
            />
            <Text style={ styles.modal_text_title}>期限</Text>
            <View>
              <TextInput
                placeholder={'期限'}
                value={ deadline }
                onChangeText={ text => setDeadline(text) }
                style={ styles.textinput }
              />
              {/* カレンダー型input */}
              <View style={styles.calender}>
                <Icon.Button name="calendar" size={20} color='#F4F1DE' backgroundColor='transparent'
                  onPress={() => setShowDay(!isShowDatePicker)} />
                  { isShowDatePicker ?
                    <DateTimePicker
                      mode="date"
                      value={pick_day}
                      display="default"
                      themeVariant="dark"
                      style={{opacity: 0.2}}
                      disabled={true}
                      onChange={changeDay} /> : null }
              </View>
            </View>
          </View>
          <View style={ styles.button }>
            <TouchableOpacity onPress={() => handleAdd()}>
              <Text style={ styles.add }>追加</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCancel()}>
              <Text style={ styles.cancel }>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1DE",
  },
  app_title:{
    color:"#3D405B",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  modal: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#F4F1DE", 
    height: "100%",
  },
  todo_wrapper: {
    marginTop: 25,
    backgroundColor:"#3D405B",
  },
  todo_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#3D405B',
  },
  todo_title: {
    width: 360,
    fontSize: 20,
    lineHeight: 20,
    padding: 3,
    margin: 5,
    marginHorizontal: 10,
    paddingTop: 5,
    textAlign: 'left',
    color: "#3D405B",
  },
  plus: {
    fontSize: 32,
    textAlign: 'center',
    color: '#F4F1DE',
    marginLeft: 11,
    marginRight: 11,
    marginBottom: 3,
  },
  taskButton: {
    textAlign: 'center',
    color: '#F4F1DE',
    backgroundColor: '#3D405B',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
  add: {
    fontSize: 18,
    textAlign: 'center',
    color: '#F4F1DE',
    width: 220,
    marginRight: 10,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: '#3D405B',
    borderWidth: 1,
  },
  cancel: {
    fontSize: 18,
    textAlign: 'center',
    color: '#3D405B',
    width: '100%',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: '#F4F1DE',
    borderWidth: 1,
  },
  textinput_frame: {
    width: '100%',
    padding: 10,
  },
  textinput: {
    fontSize: 18,
    borderColor: '#3D405B',
    color: "#3D405B",
    borderWidth: 1,
    margin: 5,
    marginHorizontal: 10,
    padding: 15,
  },
  modal_text_title:{
    marginLeft: 10,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: "50%",
  },
  delete: {
    fontSize: 15,
    paddingHorizontal: 20,
    height: "100%",
    color: '#F4F1DE',
    backgroundColor: '#3D405B',
    textAlign: "center",
    alignItems: "center",
    paddingTop: "25%",
  },
  movetext: {
    position: "absolute",
  },
  calender: {
    position: "absolute", 
    alignSelf: 'flex-end', 
    top:5, 
    width:60,
    right: 10,
    height: 53,
    backgroundColor: "#3D405B",
    paddingTop: 8,
    paddingLeft: 12
  }
});

export default App;