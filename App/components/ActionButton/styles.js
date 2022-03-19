import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.actionButtonBackground,
    width: scale(41),
    height: scale(41),
    borderRadius: scale(21),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: scale(23),
    height: scale(23)
  }
});
