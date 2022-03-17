import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    width: scale(255),
    height: scale(45),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.textInputBackground,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.textInputBorder,
    padding: scale(14)
  },
  borderTop: {
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15)
  },
  borderBottom: {
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15)
  },
  icon: {
    width: scale(18),
  },
  authInput: {
    color: Colors.textInputColor,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    fontSize: textScale(14),
    padding: 0,
    margin: 0,
    marginLeft: scale(19),
    marginRight: scale(8),
  }
});
