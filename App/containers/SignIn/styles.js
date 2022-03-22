import {StyleSheet, Dimensions} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import { textScale } from '../../utils/textUtil';
import { getDeviceHeight } from '../../utils/extension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  containerInner: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    minHeight: scale(610)
  },
  logo: {    
      marginTop: scale(106),
      width: scale(140),
      height: scale(70),
  },
  greetingText: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(18),
    fontWeight: '700',
    color: 'white',
    marginTop: scale(49)
  },
  inputForm: {
    marginTop: scale(65)
  },
  noteWrapper: {  
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scale(47)
  },
  noteText: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: 15,
    color: 'white'
  },
  loginWrapper: {
    marginTop: scale(46)
  },
  forgetWrapper: {
    marginTop: scale(24)
  }
});
