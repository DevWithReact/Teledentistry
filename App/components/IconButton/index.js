import * as React from 'react';
import {
    Image,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {scale} from '../../utils/scale';

const IconButton = ({ icon, width=18, height=18, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
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
    onPress: PropTypes.func.isRequired,
}

export default IconButton;