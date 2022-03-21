import {StyleSheet} from 'react-native';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import {scale, scaleVertical} from '../utils/scale';
import { textScale } from '../utils/textUtil';

export const styles = StyleSheet.create({
  badgeWrapper: {
    position: 'relative'
  },
  badge: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: Colors.badgeColor,
    position: 'absolute',
    left: scale(0),
    top: scale(0)
  },
});
