import * as React from 'react';
import {
    Image,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const IconButton = ({ icon, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    title: PropTypes.string,
    underline: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}

export default IconButton;