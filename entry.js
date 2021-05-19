/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from './themeContext';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const performCalculations = require('./calculate');

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Input from './input';

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

const Entry = ({navigation}) => {
  const {themeContext, theme} = useTheme();
  const {activeTheme} = themeContext;
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          setTimeout(() => {
            navigation.dispatch(StackActions.replace('EndScreen'));
          }, 1000);
          setTimeout(() => {
            BackHandler.exitApp();
          }, 2000);
        },
      },
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="color-palette-outline"
          type="ionicon"
          color="#517fa4"
          style={{marginRight: 10}}
          onPress={() => {
            navigation.navigate('Theme');
          }}
        />
      ),
      headerLeft: () => (
        <Icon
          name="list-outline"
          type="ionicon"
          color="#517fa4"
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.navigate('History');
          }}
        />
      ),
      headerStyle: {
        backgroundColor: theme[activeTheme].secondary,
      },
      headerTintColor: 'white',
    });
  });

  const isDarkMode = useColorScheme() === 'dark';

  const [displayValue, setDisplayValue] = useState([]);
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [nextValue, setNextValue] = useState(false);
  const [result, setResult] = useState('');
  const [bodmas, setBodmas] = useState();

  const styles = generateStyles(activeTheme, theme, themeContext);

  const storeData = async (value, name) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // useEffect(() => {
  //   console.log(displayValue);
  // }, [displayValue]);

  const renderButtons = () => {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <Input
            value={buttonItems}
            onPress={() => {
              handleInput(buttonItems);
            }}
            key={`btn-${buttonIndex}`}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={`row-${index}`}>
          {rowItem}
        </View>
      );
    });

    return layouts;
  };
  const handleInput = input => {
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        setDisplayValue([...displayValue, input]);
        if (!nextValue) {
          setFirstValue(firstValue + input);
        } else {
          setSecondValue(secondValue + input);
        }
        break;

      case '÷':
      case 'x':
      case '-':
      case '+':
        setOperator(input);
        let operand = displayValue.slice(-1);

        let reg = /[\\÷\\+\-\x]/g;
        let stat = reg.test(operand);

        if (operator !== null && stat) {
          displayValue.pop();
        }
        setDisplayValue([...displayValue, input]);
        setNextValue(true);
        break;

      case '.':
        let dot = displayValue.slice(-1); //gets the last character
        if (dot.toString() !== '.') {
          setDisplayValue([...displayValue, input]);
        }
        if (!nextValue) {
          setFirstValue(firstValue + input);
        } else {
          setSecondValue(secondValue + input);
        }
        break;

      case '=':
        let formatOperator =
          operator === 'x' ? '*' : operator === '÷' ? '/' : operator;
        if (displayValue.length > 0) {
          const checkOp = displayValue.slice(-1);
          let checkKeys = ['÷', 'x', '-', '+'];
          if (!checkKeys.includes(checkOp.toString())) {
            const {calcResult, newRess} = performCalculations(displayValue);
            let t = calcResult.toString().split('');
            const all = newRess + '=' + calcResult;
            setResult(all);
            storeData(all, calcResult.toFixed(3).toString());
            setDisplayValue(t);
            setNextValue(false);
            setFirstValue('');
            setSecondValue('');
            setOperator(null);
          }
        }
        break;

      case 'CLEAR':
        setNextValue(false);
        setFirstValue('');
        setSecondValue('');
        setOperator(null);
        setDisplayValue([]);
        break;

      case 'DEL':
        let c = displayValue.pop();
        setDisplayValue([...displayValue]);
        break;

      default:
        break;
    }
    return;
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{displayValue}</Text>
      </View>
      <View style={styles.inputContainer}>{renderButtons()}</View>
    </View>
  );
};

function generateStyles(activeTheme, theme, themeContext) {
  return EStyleSheet.create({
    resultContainer: {
      flex: 2,
      backgroundColor: theme[activeTheme].secondary,
      justifyContent: 'center',
    },
    inputContainer: {
      flex: 2,
      backgroundColor: theme[activeTheme].primary,
    },
    inputRow: {
      flex: 1,
      flexDirection: 'row',
    },
    resultText: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'right',
    },
  });
}

export default Entry;
