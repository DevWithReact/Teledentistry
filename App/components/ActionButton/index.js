import * as React from 'react';
import {
    Image,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {scale} from '../../utils/scale';

const ActionButton = ({ icon, width=23, height=18, onPress}) => {
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

ActionButton.propTypes = {
    icon: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func.isRequired,
}

export default ActionButton;