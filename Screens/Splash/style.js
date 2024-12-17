import { StyleSheet } from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
    splashImage: {
        width: horizontalScale(200),
        height: horizontalScale(200),
    },
    splashImageContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background:{
        flex:1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'black',
        width: horizontalScale(60),
        height: horizontalScale(60),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text:{
        fontFamily: 'Inter_24pt-Bold',
        fontSize:scaleFontSize(30),
        color:'black',
      },
      textContainer:{
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default style;
