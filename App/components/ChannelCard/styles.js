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
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: scale(15),
    borderColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
  },
  sectionMiddle: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  textHeading: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(14),
    fontWeight: '700',
    color: Colors.black,
  },
  textDescActive: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(12),
    color: Colors.textColor,
    marginTop: scale(5)
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
  chevron: {
    width: scale(12),
    height: scale(20)
  }
});
