import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(15),
    borderRadius: scale(8)
  },
  label: {
    textAlign: 'center',
    marginBottom: scale(10),
    fontSize: textScale(16)
  },
  gap: {
    height: scale(10),
  },
  icon: {
    width: scale(18),
    height: scale(18)
  }
});
