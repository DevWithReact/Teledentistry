import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  sizelg: {
    width: scale(103),
    height: scale(103)
  },
  sizemd: {
    width: scale(46),
    height: scale(46)
  },
  image: {
    borderRadius: '50%'
  },
  badge: {
    position: 'absolute',
    left: scale(10),
    bottom: scale(10),
    width: scale(11),
    height: scale(11),
    borderRadius: '50%',
    backgroundColor: Colors.mintColor,
    borderColor: Colors.captionColor,
    borderWidth: 1,
  }
});
