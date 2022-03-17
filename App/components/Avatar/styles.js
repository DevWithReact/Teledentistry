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
    borderRadius: scale(55)
  },
  badge: {
    position: 'absolute',
    width: scale(12),
    height: scale(12),
    borderRadius: scale(5.5),
    borderColor: Colors.white,
    borderWidth: 2,
  },
  badgePoslg: {
    left: scale(8),
    bottom: scale(8),
  },
  badgePosmd: {
    left: scale(2),
    bottom: scale(2),
  },
  babelActive: {    
    backgroundColor: Colors.badgeColor,
  },  
  babelInactive: {    
    backgroundColor: Colors.lightGrayColor,
  }
});
