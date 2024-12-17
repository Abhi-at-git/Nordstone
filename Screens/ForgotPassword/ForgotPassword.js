import React, { useState } from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import style from './style';

const ForgotPassword = ({navigation}) => {

  return (
    <SafeAreaView style={style.container}>
      <View style ={style.imageTextContainer}>
      <Image
              style={style.nordstoneImage}
              source={require('../../assets/images/nordstone_logo.jpg')}
            />
      <Text style={style.logoText}>Nordstone</Text>
      </View>

      <View style={style.welcomeTextContainer}>
      <Text style={style.welcomeText}>Oh, no !</Text>
      <Text style={style.welcomeText}>I forgot</Text>
      <Text style={style.subText}>Please enter your username to receive link for creating a new password</Text>
      </View>

      <TextInput
        style={style.input}
        placeholder="Username"
        placeholderTextColor="#A6A6A6"
      />

      <TouchableOpacity style={style.loginButton}>
        <Text style={style.loginButtonText}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={style.footer}>
        <Text style={style.footerText}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={style.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
