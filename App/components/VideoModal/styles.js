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
    borderRadius: scale(8),
    position: 'relative'
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
  },  
  playCircle: {
    borderRadius: scale(15),
    width: scale(30),
    height: scale(30),
    backgroundColor: Colors.closeButtonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scale(-10),
    top: scale(-10)
  },
  playIcon: {
  }
});
