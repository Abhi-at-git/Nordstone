import { StyleSheet } from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: horizontalScale(30),
      paddingTop: verticalScale(50),
      backgroundColor: '#F5F5F5',
    },
    headerText: {
      fontSize: scaleFontSize(48),
      fontWeight: 'bold',
      color: '#333',
    },
    subText: {
      fontSize: scaleFontSize(16),
      color: '#A6A6A6',
      marginBottom: verticalScale(30),
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#A6A6A6',
      paddingVertical: verticalScale(10),
      fontSize: scaleFontSize(16),
      marginBottom: verticalScale(20),
      color: '#333',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#A6A6A6',
      marginBottom: verticalScale(10),
    },
    iconContainer: {
      position: 'absolute',
      right: 0,
      padding: horizontalScale(10),
    },
    helperText: {
      fontSize: scaleFontSize(12),
      color: '#A6A6A6',
      marginBottom: verticalScale(20),
    },
    signUpButton: {
      backgroundColor: '#333',
      paddingVertical: verticalScale(15),
      borderRadius: 5,
      alignItems: 'center',
      marginTop: verticalScale(30),
    },
    signUpButtonText: {
      color: '#FFF',
      fontSize: scaleFontSize(16),
      fontWeight: 'bold',
    },
    error: {
      fontFamily: 'Inter',
      fontSize: scaleFontSize(16),
      color: '#FF0000',
      marginBottom: verticalScale(24),
    },
    success: {
      fontFamily: 'Inter',
      fontSize: scaleFontSize(16),
      color: '#28a745',
      marginBottom: verticalScale(24),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(10),
        marginHorizontal: horizontalScale(50),
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
  });

export default style;