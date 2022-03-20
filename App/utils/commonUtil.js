import moment from 'moment';

export function convertChatTime (t) {
  return moment(t).format("hh:mm A");
}
export function getFileExt(filename) {
  return filename.split('.').pop();
}