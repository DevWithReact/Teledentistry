import moment from 'moment';

export function convertChatTime (t) {
  return moment(t).format("hh:mm A");
}
export function getFileExt(filename) {
  return filename.split('.').pop();
}

export function getAudioTimeString (seconds) {
  const m = parseInt((seconds % (60 * 60)) / 60);
  const s = parseInt(seconds % 60);

  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}