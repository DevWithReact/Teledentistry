import * as React from 'react';
import {
    Image,
    View,
    TextInput
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Colors from '../../utils/Colors';

const AuthInput = ({ placeholder, icon, value, onChangeText, borderType}) => {
    let borderStyle = {};
    if (borderType === 'roundTop') {
        borderStyle = styles.borderTop;
    } else {
        borderStyle = styles.borderBottom;
    }
    return (
        <View style={[styles.container, borderStyle]}>
            <Image            
                source={icon}
                style={styles.icon}
                resizeMode={'contain'}
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={Colors.textInputPlacholder}
                returnKeyType="done"
                style={styles.authInput}
                numberOfLines={1}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

AuthInput.propTypes = {
    placeholder: PropTypes.string,
    icon: PropTypes.number,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    borderType: PropTypes.string
}

export default AuthInput;