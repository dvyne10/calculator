/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import {useTheme} from './themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';

const History = ({navigation}) => {
  const {themeContext, theme} = useTheme();
  // eslint-disable-next-line no-unused-vars
  const {activeTheme, setActiveTheme} = themeContext;
  const [dataKeys, setDataKeys] = useState();
  const [data, setData] = useState([]);

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    setDataKeys(keys);
    return;
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  const getMultiple = async () => {
    let values;
    try {
      if (dataKeys.length === 1) {
        values = await AsyncStorage.getItem(dataKeys[0]);
      } else {
        values = await AsyncStorage.multiGet(dataKeys);
      }
    } catch (e) {
      // read error
    }
    setData(values);
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  };

  useEffect(() => {
    const unSubscribe = getMultiple();
    return () => {
      unSubscribe;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataKeys]);

  useEffect(() => {
    const unSubscribe = getAllKeys();
    return () => {
      unSubscribe;
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme[activeTheme].secondary,
      },
      headerTintColor: 'white',
    });
  });
  return (
    <>
      <View style={{flex: 1, backgroundColor: theme[activeTheme].primary}}>
        {typeof data !== 'string' ? (
          <FlatList
            data={data}
            renderItem={({item}) => {
              const itemsplit = item[1].split('=');
              return (
                <>
                  <View
                    style={{
                      width: '95%',
                      backgroundColor: '#a8a59b',
                      margin: 10,
                      padding: 10,
                    }}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      {itemsplit[0].substring(1)}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'right',
                        fontSize: 23,
                        fontWeight: 'bold',
                        color: 'green',
                      }}>
                      {`= ${itemsplit[1].substring(
                        0,
                        itemsplit[1].length - 1,
                      )}`}
                    </Text>
                  </View>
                </>
              );
            }}
            keyExtractor={item => item[0]}
            // extraData={selectedId}
          />
        ) : (
          <>
            <View
              style={{
                width: '95%',
                backgroundColor: '#a8a59b',
                margin: 10,
                padding: 10,
              }}>
              {data && (
                <>
                  <Text style={{fontSize: 20, color: 'white'}}>
                    {data.split('=')[0].substring(1)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 23,
                      fontWeight: 'bold',
                      color: 'green',
                    }}>
                    {`= ${data
                      .split('=')[1]
                      .substring(0, data.split('=')[1].length - 1)}`}
                  </Text>
                </>
              )}
            </View>
          </>
        )}
        <Button
          title="clear"
          buttonStyle={{
            backgroundColor: theme.normal.secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => {
            clearAll();
            setDataKeys(null);
          }}
        />
      </View>
    </>
  );
};

export default History;
