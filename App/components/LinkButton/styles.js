import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
  },
  text: {
    color: Colors.textInputBackground,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '700',
    fontSize: textScale(13)
  }
});
