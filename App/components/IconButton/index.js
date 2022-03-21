import * as React from 'react';
import {
    Image,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {scale} from '../../utils/scale';

const IconButton = ({ icon, width=18, height=18, disabled, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            disabled={disabled}
        >
            <Image
                source={icon}
                style={[
                    styles.icon,
                    {                    
                        width: scale(width),
                        height: scale(height)
                    }
                ]}
            />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    icon: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}

export default IconButton;