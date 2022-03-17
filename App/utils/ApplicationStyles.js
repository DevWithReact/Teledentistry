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

  H1: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSansBold,
    fontWeight: '700',
    fontSize: textScale(24),
    lineHeight: scale(32.68),
  },
  H2: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSansBold,
    fontWeight: '700',
    fontSize: textScale(20),
  },
  H3: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSansBold,
    fontWeight: '700',
    fontSize: textScale(18),
  },
  H4: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontWeight: '600',
    fontSize: textScale(16),
  },
  Body: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontWeight: '600',
    fontSize: textScale(14),
    lineHeight: scale(19.07),
  },
  Description: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSans,
    fontWeight: '400',
    fontSize: textScale(10),
    lineHeight: scale(13.62),
  },
  Regular: {
    color: Colors.primaryColor,
    fontFamily: Fonts.NunitoSans,
    fontWeight: '400',
    fontSize: textScale(12),
  },
  Note: {
    color: Colors.itemHintColor,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontWeight: '600',
    fontSize: textScale(12),
    lineHeight: scale(16.34),
  },

  seeAll: {
    fontFamily: Fonts.NunitoSans,
    fontWeight: '600',
    fontSize: textScale(16),
    color: Colors.yellowInfoColor,
  },
});
