import * as React from 'react';
import {
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const Avatar = ({ source, size="lg"}) => {
    const sizeStyle = (size === "lg") ? styles.sizelg : styles.sizemd;
    return (
        <View style={styles.container}>
            <Image
                source={source}
                style={[styles.image, sizeStyle]}
            />
            <View style={styles.badge}/>
        </View>
    )
};

Avatar.propTypes = {
    source: PropTypes.string|PropTypes.number,
    size: PropTypes.string
}

export default Avatar;