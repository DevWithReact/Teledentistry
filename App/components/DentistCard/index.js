import * as React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Images from '../../utils/Images';
import Avatar from '../Avatar';
import IconButton from '../IconButton';

const DentistCard = ({ dentist }) => {    
    return (
        <View style={styles.container}>
            <Avatar
                source={Images.template_user}
                badgeActive={true}
                showBadge={true}
                size="md"
            />
            <View style={styles.sectionRight}>
                <Text style={styles.textHeading}>Dr. Partircia Speidel, DMD</Text>
                <Text style={styles.textDesc}>Last appointment 03/07/2021</Text>
                <View style={styles.icons}>
                    <IconButton
                        icon={Images.ic_phone}
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={Images.ic_mail}
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={Images.ic_chat}
                        onPress={() => {}}
                    />
                </View>
            </View>
            <Image
                source={Images.ic_info}
                style={styles.info}
            />
        </View>
    )
};

DentistCard.propTypes = {
    dentist: PropTypes.any,
}

export default DentistCard;