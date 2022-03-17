import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    width: scale(255),
    height: scale(36),
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: scale(17),
    borderStyle: 'solid',
    borderWidth: scale(2),
    borderColor: Colors.textInputBackground,
  },
  text: {
    color: Colors.textInputBackground,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '700',
    fontSize: textScale(18),
  }
});
