import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('User');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a043b',
      }}>
      <View
        style={{
          height: 200,
          width: 220,
          padding: 10,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Image
          resizeMode="contain"
          source={require('../asset/KD.webp')}
          style={{height: 100, width: 190}}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
