import {Dimensions, Platform, StatusBar} from 'react-native';

/**
 * getDeviceHeight
 * Get the application window's height
 *
 * @returns {number}
 */
export function getDeviceHeight() {
  const statusBarHeight = isAndroid() ? StatusBar.currentHeight : 0;
  return Dimensions.get('window').height - statusBarHeight;
}

/**
 * getDeviceWidth
 * get the application window's width
 *
 * @returns {number}
 */
export function getDeviceWidth() {
  return Dimensions.get('window').width;
}

/**
 * isIphoneX
 *
 * @returns {boolean}
 */
export function isIphoneX() {
  const dimen = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

/**
 * isIOS
 *
 * @returns {boolean}
 */
export function isIOS() {
  return Platform.OS === 'ios';
}

/**
 * isAndroid
 *
 * @returns {boolean}
 */
export function isAndroid() {
  return Platform.OS === 'android';
}
