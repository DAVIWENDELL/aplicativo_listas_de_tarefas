import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  Alert,
} from "react-native";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import task from './banco/task';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {

  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');


  async function addTask() {
    
    if (newTask == ' ') {
      return;
    }

    const search = task.filter(task => task == newTask);

    if (search.length != 0) {
      Alert.alert("Atenção", "Nome da tarefa repitido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask(" ");

    Keyboard.dismiss();
  } 
  
  async function removeTask(item) {
    Alert.alert(
      "Deletar Task",
      "Tem certeza que deseja remover esta anotação",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: 'cancel'
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(task => task != item))
        }
      ],
      { cancelable: false}
    );
  }


  return (
    <>
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{ flex: 1 }}
      enabled={ Platform.OS == 'ios' }
    >
      <View style={styles.container}>
        <View style={styles.Body}>
          <FlatList 
            style={styles.FlatList} 
            data={task}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.ContainerView}>
                <Text style={styles.Texto}>{item}</Text>
                <TouchableOpacity onPress={() => removeTask(item)}>
                  <MaterialIcons 
                    name="delete-forever" 
                    size={25} 
                    color="#f64c75"
                  />
                </TouchableOpacity>
              </View>
          )}
          />
        </View>
        <View style={styles.Form}>
          <TextInput 
          style={styles.Input}
          placeholderTextColor='#999'
          autoCorrect={true}
          placeholder="Adicione uma tarefa " 
          maxLength={25}
          onChangeText={text => setNewTask(text)}
          value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <Entypo name="add-to-list" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 10,
    borderColor: '#eee'
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#eee',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee'
  },
  Texto: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center'
  }
});