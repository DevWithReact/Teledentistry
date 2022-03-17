import {StyleSheet} from 'react-native';
import Fonts from '../../../utils/Fonts';
import Colors from '../../../utils/Colors';
import {scale, scaleVertical} from '../../../utils/scale';
import { textScale } from '../../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  sectionProfile: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    width: '100%',
    paddingTop: scale(18),
    paddingBottom: scale(29)
  },
  name: {
    textAlign: 'center',  
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(13),
    fontWeight: '700',
    color: 'white',
    marginTop: scale(10)
  },
  desc: {
    textAlign: 'center',
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(12),
    color: 'white',
    marginTop: scale(2)
  },
  graph: {
      width: '100%',
      marginBottom: scale(31)
  },
  chartHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginTop: scale(25),
    marginBottom: scale(19)
  },
  textPrimary: { 
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(13),
    fontWeight: '700',
    color: Colors.primaryColor,
    marginTop: scale(10)
  },
  textSecondary: { 
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(13),
    fontWeight: '700',
    color: Colors.secondaryColor,
    marginTop: scale(10)
  },
  textGray: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(13),
    fontWeight: '700',
    color: Colors.mediumGrayColor,
    marginTop: scale(10)
  },
  labelIndent: {
    marginLeft: scale(24),
    marginBottom: scale(5)
  },
  sectionDentists: {
    width: '100%',
    paddingHorizontal: scale(9)
  },  
  sectionAppoints: {
    width: '100%',
    paddingHorizontal: scale(9),
    marginBottom: scale(20)
  }
});
