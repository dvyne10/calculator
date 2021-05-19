/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import Entry from './entry';
import History from './history';
import Theme from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeContext} from './themeContext';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8',
});

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Menu'));
    }, 1000);
  });
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>
        Welcome to my Calculator App
      </Text>
      <Text style={{fontSize: 30}}>Built by GROUP 12</Text>
    </View>
  );
};

const EndScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>
        Thank You for using the Calculator app
      </Text>
      <Text style={{fontSize: 30, textAlign: 'center'}}>
        Hope you enjoyed it
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <ThemeContext.ProviderWrapper>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              lazy={false}
              initialRouteName="SplashScreen"
              // headerMode="none"
              mode="modal">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Menu"
                component={Entry}
                options={{
                  headerStyle: {
                    // backgroundColor: theme[activeTheme].secondary,
                  },
                }}
              />
              <Stack.Screen name="History" component={History} />
              <Stack.Screen name="Theme" component={Theme} />
              <Stack.Screen
                name="EndScreen"
                component={EndScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeContext.ProviderWrapper>
    </>
  );
};

// const styles = StyleSheet.create({
//   resultContainer: {
//     flex: 2,
//     backgroundColor: '#1E1240',
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     flex: 2,
//     backgroundColor: 'red',
//   },
//   inputRow: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   resultText: {
//     color: 'white',
//     fontSize: 40,
//     fontWeight: 'bold',
//     padding: 20,
//     textAlign: 'right',
//   },
// });

export default App;
