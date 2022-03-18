import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  appBar: {
    width: '100%',
    height: scale(56),
    paddingTop: scale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
  },
  action: {
    position: 'absolute',
    right: scale(27),
    bottom: scale(13),
  },
  mainList: {
    flexGrow: 0
  },
  archivedList: {
    flexGrow: 0,
  },
  archived: {
    marginVertical: scale(23)
  }
});
