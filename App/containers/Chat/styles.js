import {StyleSheet, Platform} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  spinnerTextStyle: {
    color: Colors.white
  },
  appBar: {
    width: '100%',
    height: scale(56),
    paddingTop: scale(12),
    paddingHorizontal: scale(22),
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android:{
         borderBottomWidth:2,
         borderBottomColor:'#F3F4F577'      
      },
      default:{
        shadowColor: '#F3F4F5',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        shadowOpacity: 0.8,
      }
    })
  },
  left_actions: {
    flexDirection: 'row',
  },
  end_actions: {    
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    width: scale(15)
  },
  appbarText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: scale(20)
  },
  mainList: {
    flexGrow: 0,
    borderColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
  },
  archivedList: {
    flexGrow: 0,
    borderColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  archived: {
    marginVertical: scale(23)
  },
  inputToolbar: {
    borderTopWidth: 0,
    marginBottom: scale(11)
  },
  actionStyles: {    
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: scale(6)
  },
  composerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: scale(25),
    borderColor: Colors.textInputBorder,
    borderWidth: 1,
    paddingHorizontal: scale(6),
    marginRight: scale(6)
  },
  composerInput: {
    fontFamily: Fonts.Epilogue,
    fontSize: textScale(14),
    fontWeight: '500',
  },
  sendStyle: {
    width: scale(60),
    height: scale(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOption: {
    fontFamily: Fonts.Epilogue,
    fontSize: textScale(14),
    fontWeight: '400',
    color: Colors.textColor,
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
  },
  archivedText: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: textScale(14),
    textAlign: 'center',
    fontWeight: '700',
    color: Colors.primaryColor,
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
  },
  typing: {
    height: scale(45)
  },
  footer: {    
    height: scale(15)
  }
});
