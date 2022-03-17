import {Alert} from 'react-native';

/**
 * showAlert
 *
 * @param {string} title
 * @param {string} msg
 */
function showAlert(title, msg) {
  Alert.alert(title, msg);
}

/**
 * showWarning
 *
 * @param {string} msg
 */
function showWarning(msg) {
  Alert.alert('Warning', msg);
}

/**
 * showError
 *
 * @param {string} msg
 */
function showError(msg) {
  Alert.alert('Error', msg);
}

/**
 * showSuccess
 *
 * @param {stromg} msg
 */
function showSuccess(msg) {
  Alert.alert('Success', msg);
}

/**
 * showNotice
 *
 * @param {string} title
 * @param {string} msg
 * @param {object} handler () => {}
 */
function showNotice(title, msg, handler) {
  Alert.alert(title, msg, [
    {
      text: 'OK',
      onPress: () => {
        handler();
      },
    },
  ]);
}

/**
 * confirmAlert
 *
 * @param {string} title
 * @param {string} msg
 * @param {string} success
 * @param {object} onSuccess () => {}
 * @param {object} onFailure () => {}
 */
function confirmAlert(title, msg, success, onSuccess, onFailure = () => {}) {
  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      onPress: onFailure,
      style: 'cancel',
    },
    {text: success, onPress: onSuccess},
  ]);
}

export const dialogUtil = {
  showWarning,
  showAlert,
  showNotice,
  showError,
  showSuccess,
  confirmAlert,
};
