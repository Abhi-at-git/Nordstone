import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../navigation/Routes';
import {createUser} from '../../api/user';

const SignUp = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const[success,setSuccess] = useState('');
  const[error,setError] = useState('');


  return (
    <SafeAreaView style={style.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.headerText}>Hi !</Text>
      <Text style={style.headerText}>Welcome</Text>
      <Text style={style.subText}>Let's create an account</Text>

      <TextInput
        style={style.input}
        placeholder="Email"
        placeholderTextColor="#A6A6A6"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={style.input}
        placeholder="Full Name"
        placeholderTextColor="#A6A6A6"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      <TextInput
        style={style.input}
        placeholder="Username"
        placeholderTextColor="#A6A6A6"
        value={username}
        onChangeText={(text) => setUsername(text)}
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

      <Text style={style.helperText}>Must contain a number and at least 6 characters</Text>

      <View>
        {error.length>0 && <Text style = {style.error}>{error}</Text>}
        {success.length>0 && <Text style={style.success}>{success}</Text>}
      </View>

      <TouchableOpacity 
        style={style.signUpButton}
        isDisabled={
          fullName.length <= 2 || email.length <= 5 || password.length < 8
        }
        onPress={async () => {
          let user = await createUser(email,fullName,username, password);
          if(user.error){
            setError(user.error);
          }else{
            setError('');
            setSuccess('You have successfully registered');
            setTimeout(() => navigation.goBack(),3000);
          }
        }
          }
        >
        <Text style={style.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={style.footer}>
        <Text style={style.footerText}>Already Have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.UserLogin)}>
          <Text style={style.signUpText}>Log In</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
