import * as React from 'react';
import {
    Text,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const LinkButton = ({ title, underline = true, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={[styles.text, underline ? {
                textDecorationLine: 'underline'
            } : {}]}>
            {title}
            </Text>
        </TouchableOpacity>
    );
};

LinkButton.propTypes = {
    title: PropTypes.string,
    underline: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}

export default LinkButton;