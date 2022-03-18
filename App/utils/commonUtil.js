import moment from 'moment';

export function convertChatTime (t) {
  return moment(t).format("hh:mm A");
}