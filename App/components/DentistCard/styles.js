import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: scale(17),
    paddingVertical: scale(24),
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: scale(15)
  },
  sectionRight: {
    marginLeft: scale(14)
  },
  textHeading: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(14),
    fontWeight: '700',
    color: Colors.black,
  },
  textDesc: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(12),
    color: Colors.greyColor,
    marginTop: scale(5)
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(18),
    width: scale(117)
  },
  info: {
    position: 'absolute',
    right: scale(5),
    bottom: scale(5),
    width: scale(17),
    height: scale(17)
  }
});
