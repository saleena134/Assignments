import React, {useState, useRef, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch} from 'react-redux';
import {getchat} from './redux/action';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(route.params.record.sender_id);
  const [receiverId, setReceiverId] = useState(route.params.record.receiver_id);
  const [name, setName] = useState(route.params.record.name);
  const [image_path, setImage_path] = useState(route.params.record.image_path);
  const ws = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('initiateSocketConnection');
    // enter your websocket url to open connection
    ws.current = new WebSocket('wss://');
    // enter your websocket url to open connection

    ws.current.onopen = () => {
      console.log('connection establish open');
    };
    ws.current.onclose = () => {
      console.log('connection establish closed');
    };
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: receiverId, // receiver id
        text: 'Hello New Chat',
        createdAt: new Date(),
        user: {
          _id: senderId, // sender id
          name: name,
          avatar: image_path,
        },
      },
    ]);
  }, []);

  useEffect(() => {
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log('onmessage=>', JSON.stringify(response));
      dispatch(getchat(response));
      var sentMessages = {
        _id: response.receiverId,
        text: response.message,
        createdAt: new Date(response.createdAt * 1000),
        user: {
          _id: response.senderId,
          name: name,
          avatar: image_path,
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, sentMessages),
      );
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    let obj = {
      senderId: senderId,
      receiverId: receiverId,
      message: messages[0].text,
      action: 'message',
    };
    ws.current.send(JSON.stringify(obj));
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 15,
          marginTop: 50,
          backgroundColor: '#0a043b',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            borderColor: '#fff',
            borderWidth: 1,
            padding: 7,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          {name}
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderId, // set sender id
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Chat;
