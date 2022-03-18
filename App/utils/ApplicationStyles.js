import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';
import {scale} from './scale';
import {textScale} from './textUtil';

export default StyleSheet.create({
  fullView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  primaryLabel: {    
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(13),
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  darkLabel: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(14),
    fontWeight: '700',
    color: Colors.black,
  },
  textDesc: {    
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(12),
    color: Colors.greyColor,
  },
  textCenter: {
    textAlign: 'center'
  }
});
