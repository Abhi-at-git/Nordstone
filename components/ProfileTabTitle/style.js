import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  title: {
    color: '#022150',
    fontFamily: 'Inter_24pt-Black',
    fontSize: scaleFontSize(14),
    padding: horizontalScale(8),
  },
  titleNotFocused: {
    color: '#79869F',
    fontFamily: 'Inter_18pt-Medium',
  },
});

export default style;