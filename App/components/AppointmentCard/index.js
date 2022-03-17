import * as React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Images from '../../utils/Images';

const AppointmentCard = ({ title, description }) => {    
    return (
        <View style={styles.container}>            
            <View style={styles.sectionLeft}>
                <Text style={styles.textHeading}>{title}</Text>
                <Text style={styles.textDesc}>{description}</Text>
            </View>
            <Image
                source={Images.ic_info}
                style={styles.info}
            />
        </View>
    )
};

AppointmentCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default AppointmentCard;