import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {useTheme} from './themeContext';

const Theme = ({navigation}) => {
  const {themeContext, theme} = useTheme();
  const {activeTheme, setActiveTheme} = themeContext;

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
        <Button
          title="normal"
          buttonStyle={{
            backgroundColor: theme['normal'].secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => {
            setActiveTheme('normal');
          }}
        />
        <Button
          title="orange"
          buttonStyle={{
            backgroundColor: theme['orange'].secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => {
            setActiveTheme('orange');
          }}
        />
        <Button
          title="magenta"
          buttonStyle={{
            backgroundColor: theme['magenta'].secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => setActiveTheme('magenta')}
        />
        <Button
          title="fedora"
          buttonStyle={{
            backgroundColor: theme['fedora'].secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => setActiveTheme('fedora')}
        />
        <Button
          title="Red"
          buttonStyle={{
            backgroundColor: theme['Red'].secondary,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => setActiveTheme('Red')}
        />
      </View>
    </>
  );
};

export default Theme;
