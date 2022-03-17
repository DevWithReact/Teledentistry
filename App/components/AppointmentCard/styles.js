import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scale(21),
    paddingRight: scale(7),
    paddingVertical: scale(11),
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: scale(15)
  },
  sectionLeft: {

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
  info: {
    width: scale(17),
    height: scale(17)
  }
});
