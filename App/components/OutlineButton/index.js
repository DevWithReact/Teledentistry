import * as React from 'react';
import {
    Text,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const OutlineButton = ({ title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.text}>
            {title}
            </Text>
        </TouchableOpacity>
    );
};

OutlineButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
}

export default OutlineButton;