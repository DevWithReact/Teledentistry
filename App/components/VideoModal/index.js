import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button
  } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {styles} from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';

const VideoModal = ({ currentMessage, visible, onClose}) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onClose();
            }}
            onBackButtonPress={() => {
                onClose();
            }}
        >
          <View style={styles.container}>
            <TouchableOpacity
                style={styles.playCircle}
                onPress={onClose}
            >
                <Icon
                    name="close"
                    size={15}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
            <VideoPlayer
                video={{ uri: currentMessage.video}}
                thumbnail={{ uri: currentMessage.image }}
            />
          </View>
        </Modal>
    );
};

VideoModal.propTypes = {
    url: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}

export default VideoModal;