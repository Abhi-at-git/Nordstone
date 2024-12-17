import React, { useState } from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../navigation/Routes';
import { loginUser } from '../../api/user';

const UserLogin = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const[error, setError] = useState('');

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
      <Text style={style.welcomeText}>Hi !</Text>
      <Text style={style.welcomeText}>Welcome</Text>
      <Text style={style.subText}>Please enter your detail</Text>
      </View>

      <TextInput
        style={style.input}
        placeholder="Username"
        placeholderTextColor="#A6A6A6"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={style.passwordContainer}>
        <TextInput
          style={style.input}
          placeholder="Password"
          placeholderTextColor="#A6A6A6"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={style.iconContainer}
        >
            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} size={20}
            color="#A6A6A6" />
        </TouchableOpacity>
      </View>

      <View style={style.row}>
        <View style={style.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={style.checkbox}
          />
          <Text style={style.label}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={style.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      <View>
        {error.length>0 && <Text style = {style.error}>{error}</Text>}

      </View>

      <TouchableOpacity 
        style={style.loginButton} 
        onPress={async () => {
          let user = await loginUser(email, password);
          if (!user.status) {
            setError(user.error);
          } else {
            setError('');
            navigation.navigate(Routes.Home);
          }
        }}
        isDisabled={email.length < 5 || password.length < 8}
      >
        <Text style={style.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={style.footer}>
        <Text style={style.footerText}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.SignUp)}>
          <Text style={style.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserLogin;
