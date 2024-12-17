import { StyleSheet } from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  nordstoneImage: {
    width: horizontalScale(60),
    height: horizontalScale(60),
  },
  imageTextContainer:{
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: horizontalScale(30),
      marginBottom:verticalScale(80),
      backgroundColor: '#F5F5F5',
    },
    logoText: {
      fontSize: scaleFontSize(20),
      fontWeight: 'bold',
      color: '#333',
      marginBottom:verticalScale(50),
    },
    welcomeTextContainer:{
      marginBottom:verticalScale(40),
    },
    welcomeText: {
      fontSize: scaleFontSize(40),
      fontWeight: 'bold',
      textAlign: 'left',
      color: '#333',
    },
    subText: {
      fontSize: scaleFontSize(14),
      color: '#A6A6A6',
      marginBottom: verticalScale(30),
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#A6A6A6',
      marginBottom: verticalScale(20),
      paddingVertical: verticalScale(5),
      fontSize: scaleFontSize(16),
      color: '#333',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#A6A6A6',
      marginBottom: verticalScale(20),
    },
    iconContainer: {
      position: 'absolute',
      right: 0,
      padding: horizontalScale(10),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      marginRight: horizontalScale(8),
    },
    label: {
      fontSize: scaleFontSize(14),
      color: '#333',
    },
    forgotText: {
      fontSize: scaleFontSize(14),
      color: '#A6A6A6',
    },
    loginButton: {
      backgroundColor: '#333',
      paddingVertical: verticalScale(12),
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    loginButtonText: {
      color: '#FFF',
      fontSize: scaleFontSize(16),
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerText: {
      fontSize: scaleFontSize(14),
      color: '#A6A6A6',
    },
    signUpText: {
      fontSize: scaleFontSize(14),
      fontWeight: 'bold',
      color: '#333',
      marginLeft: horizontalScale(5),
    },
    error: {
      fontFamily: 'Inter',
      fontSize: scaleFontSize(16),
      color: '#FF0000',
      marginBottom: verticalScale(24),
    },
  });

export default style;

