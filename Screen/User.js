import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const User = () => {
  const navigation = useNavigation();
  const [userList, setUserList] = useState([
    {
      name: 'IT',
      email: 'IT@gmail.com',
      image_path:
        'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
      sender_id: '1',
      receiver_id: '2',
    },
    {
      name: 'SALES',
      email: 'sales@gmail.com',
      image_path:
        'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
      sender_id: '2',
      receiver_id: '1',
    },
    {
      name: 'HR',
      email: 'hr@gmail.com',
      image_path:
        'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
      sender_id: '3',
      receiver_id: '2',
    },
  ]);
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 15,
          marginTop: 50,
          backgroundColor: '#0a043b',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{backgroundColor: '#fff', padding: 5}}>
          <Image
            source={require('../asset/KD.webp')}
            resizeMode="contain"
            style={{height: 30, width: 100}}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Chat Group
        </Text>
      </View>
      <FlatList
        style={{
          marginHorizontal: 15,
          marginTop: 20,
        }}
        data={userList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              elevation: 10,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#ff',
              borderColor: '#ddd',
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.push('Chat', {
                record: item,
              });
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: '#ddd',
              }}
              source={{uri: item.image_path}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 20,
                fontWeight: '400',
              }}>
              {item.name + `\n` + item.email}{' '}
            </Text>
          </TouchableOpacity>
        )}
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
export default User;
