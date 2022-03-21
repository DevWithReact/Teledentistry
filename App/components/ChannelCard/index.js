import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Images from '../../utils/Images';
import Avatar from '../Avatar';
import { convertChatTime } from '../../utils/commonUtil';

const ChannelCard = ({ avatar, title, message, time, active, onPress }) => {
    let lastMsg = "";
    if (message.file) {
        lastMsg = `File sent [${message.file.name}]`;
    } else if (message.video) {
        lastMsg = "Video sent";
    } else if (message.image) {
        lastMsg = "Image sent";
    } else {
        lastMsg = message.text;
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Avatar
                source={avatar}
                badgeActive={active}
                showBadge={true}
                size="md"
            />
            <View style={styles.sectionMiddle}>
                <Text style={styles.textHeading}>{title}</Text>
                <Text style={active ? styles.textDescActive : styles.textDesc}>{lastMsg}</Text>
                <Text style={styles.textDesc}>{convertChatTime(time)}</Text>
            </View>
            <Image
                source={active ? Images.ic_chevron_right : Images.ic_chevron_right_grey}
                style={styles.chevron}
            />
        </TouchableOpacity>
    )
};

ChannelCard.propTypes = {
    avatar: PropTypes.any,
    title: PropTypes.string,
    message: PropTypes.object,
    time: PropTypes.object,
    active: PropTypes.bool,
    onPress: PropTypes.func,
    dentist: PropTypes.any,
}

export default ChannelCard;