import {StyleSheet, Platform} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    paddingVertical: scale(7),
  },
  playerWrapper: {
    flexDirection: 'row',
    alignItems: "center"
  },
  slider: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: Platform.select({ios: 5}),
  }
});