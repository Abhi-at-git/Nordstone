/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

const CalculatorButtonValue = [
  1,
  2,
  3,
  ' + ',
  4,
  5,
  6,
  ' - ',
  7,
  8,
  9,
  ' x ',
  0,
  'Clear',
  'Enter',
];

const Calculator = () => {
  const [textValue, setTextValue] = useState('');
  const [operatorCount, setOperatorCount] = useState(0);
  const [resultFromServer, setResultFromServer] = useState('');
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  async function getResultFromServer(x , y , operation ) {
    await axios
      .post('http://localhost:5000', {
        x: x,
        y: y,
        operation: operation,
      })
      .then(res => {
        console.log(res);
        setResultFromServer(() => {
          return res?.data?.result.toString();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  function InputPanelCalculator(TextEntered) {
    console.log(TextEntered.split(' '));
    const splitedText = TextEntered.split(' ');
    getResultFromServer(
      Number(splitedText[0]),
      Number(splitedText[2]),
      splitedText[1],
    );
  }
  const CalculatorButton = ({Value, Key, onClickButton, ButtonDisabled}) => {
    return (
      <View key={Key} style={{padding: 4}}>
        <TouchableOpacity
          style={[
            {
              height: 70,
              width: 70,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            },
            Value === 'Enter'
              ? ButtonDisabled
                ? {width: 150, backgroundColor: 'red'}
                : {width: 150}
              : {},
          ]}
          onPress={() => onClickButton()}
          disabled={Value === 'Enter' && ButtonDisabled}>
          <Text style={{color: 'black', fontSize: 20}}>{Value}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{padding: 16}}>
      {/* <TextInputn
        style={{
          height: 100,
          width: '100%',
          borderWidth: 2,
          color: 'black',
          textAlign: 'right',
          marginVertical: 10,
          borderRadius: 8,
          textAlignVertical: 'bottom',
        }}
        editable={false}
        value={textValue}
      /> */}
      <View>
        <View style={{flexDirection: 'row'}}>
         
          <Text style={{color: 'black'}}>variable x : {xValue}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          
          <Text style={{color: 'black'}}>variable y : {yValue}</Text>
        </View>
      </View>
      <View
        style={{
          height: 40,
          width: '100%',
          borderWidth: 3,
          backgroundColor: 'grey',
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>
          Result: {resultFromServer}
        </Text>
      </View>
      {operatorCount > 1 && (
        <View
          style={{
            height: 30,
            width: '100%',
            backgroundColor: 'red',
            alignItems: 'flex-end',
            padding: 4,
            borderRadius: 6,
          }}>
          <Text style={{color: 'white'}}>
            more than one operator Detected Count:{operatorCount}
          </Text>
        </View>
      )}
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 40}}>
        {CalculatorButtonValue.map((item, index) => (
          <CalculatorButton
            Value={item}
            key={index}
            Key={index}
            ButtonDisabled={operatorCount > 1}
            onClickButton={() => {
              if (
                item.toString().trim() === '+' ||
                item.toString().trim() === '-' ||
                item.toString().trim() === 'x'
              ) {
                setOperatorCount(value => {
                  return value + 1;
                });
              }
              if (item.toString().toLowerCase() === 'clear') {
                setTextValue(() => {
                  return '';
                });
                setOperatorCount(() => {
                  return 0;
                });
              } else if (item.toString().toLowerCase() === 'enter') {
                InputPanelCalculator(textValue.toString());
              } else {
                setTextValue(value => {
                  return `${value}${item}`;
                });
              }
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Calculator;