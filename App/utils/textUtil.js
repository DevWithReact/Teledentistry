import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Guideline sizes are based on standard screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 975;

const textScale = size => (width / guidelineBaseWidth) * size;
const textScaleVertical = size => (height / guidelineBaseHeight) * size;
const textScaleModerate = (size, factor = 0.5) =>
  size + (textScale(size) - size) * factor;

export {textScale, textScaleVertical, textScaleModerate};
